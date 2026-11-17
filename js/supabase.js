/**
 * Supabase Client & Database Service for Crewlyy
 * Direct Cloud Database Operations (No localStorage)
 */

// --- 1. CONFIGURATION ---
const SUPABASE_URL = "https://qjtqkrovjhdbeximknhx.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DKsFfiSa9BL-XYRvA_C0zw_7T86snOn";

// --- 2. INITIALIZATION ---
window.supabaseClient = null;
if (
  window.supabase &&
  SUPABASE_URL &&
  !SUPABASE_URL.includes("YOUR_PROJECT_ID")
) {
  try {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("[Supabase] Cloud client connected.");
  } catch (err) {
    console.error("[Supabase] Failed to initialize client:", err);
  }
} else {
  console.warn("[Supabase] Supabase client library or credentials not found.");
}

// --- 3. DATABASE OPERATIONS ---
window.CrewlyyDB = {
  isConfigured: () => Boolean(supabase),

  // TEAMS: Fetch all teams from Supabase
  async getTeams() {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []).map((row) =>
        row.data ? { ...row.data, id: row.id || row.data.id } : row,
      );
    } catch (err) {
      console.error("[Supabase] Error fetching teams:", err);
      return [];
    }
  },

  // TEAMS: Fetch the latest team formation or draft
  async getLatestTeam() {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("updated_at", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (data && data.length > 0) {
        const row = data[0];
        return row.data ? { ...row.data, id: row.id || row.data.id } : row;
      }
      return null;
    } catch (err) {
      console.error("[Supabase] Error fetching latest team:", err);
      return null;
    }
  },

  // TEAMS: Save or update team in Supabase
  async saveTeam(team) {
    if (!supabase) {
      console.error("[Supabase] Client not initialized. Cannot save team.");
      return { success: false, error: "Not connected to database" };
    }

    try {
      const { data, error } = await supabase.from("teams").upsert(
        {
          id: team.id || `team-${Date.now()}`,
          name: team.name,
          data: team,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );

      if (error) throw error;
      console.log("[Supabase] Team saved to cloud:", team.name);
      return { success: true, data };
    } catch (err) {
      console.error("[Supabase] Failed to save team:", err);
      return { success: false, error: err };
    }
  },

  // PROFILE: Fetch user profile
  async getProfile(userId = "default_user") {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data && data.data ? data.data : null;
    } catch (err) {
      console.error("[Supabase] Error fetching profile:", err);
      return null;
    }
  },

  // PROFILE: Save user profile
  async saveProfile(profile, userId = "default_user") {
    if (!supabase) {
      console.error("[Supabase] Client not initialized. Cannot save profile.");
      return { success: false, error: "Not connected to database" };
    }

    try {
      const { data, error } = await supabase.from("profiles").upsert(
        {
          id: userId,
          data: profile,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );

      if (error) throw error;
      console.log("[Supabase] Profile saved to cloud");
      return { success: true, data };
    } catch (err) {
      console.error("[Supabase] Failed to save profile:", err);
      return { success: false, error: err };
    }
  },
};
