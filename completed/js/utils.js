export function useUtils() {
   function setVisibleHeader(header) {
      if(!header) {
         return
      }else{
         header.style.opacity = 1
      }
   }
   function hideHeader(header) {
      if(!header) {
         return
      }else{
         header.style.opacity = 0
      }
   }
   return {
      setVisibleHeader,
      hideHeader
   }
}