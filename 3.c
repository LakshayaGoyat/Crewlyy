#include <stdio.h>
    int binarySearch(int arr[], int size , int target){
    int low=0;
    int high = size - 1;
    while(low<=high){
        int mid = low + (high - low)/2;
        if(arr[mid] == target){
            return mid;
        }else if (arr[mid] > target){
            high = mid -1;
        }else{
            low = mid+1;
        }
        }
        return -1;
    }
    int main(){
        int arr[] = {10,20,30,40,50,60};
        int size =6;
        int target;
        printf("Enter The Element To Search");
        scanf("%d" , &target);
        int result = binarySearch(arr,size,target);
        if(result != -1){
            printf("Element Found At Index %d", result);
        }else{
            printf("Element Not Found");
        }
        return 0;
    }