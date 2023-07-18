import  { useCallback, useContext } from 'react';
import { ModalsProviderContext, ModalData } from '../contexts';

const useModal = (modalData?: ModalData, key?: string) => {
  const { onPresent, onDismiss } = useContext(ModalsProviderContext);




  const handlePresent = useCallback(() => {
    if (modalData) {
      
      

      onPresent(modalData, key);
      
      
     
    } else {
      console.error('Modal data is undefined');
    }
  }, [key, modalData, onPresent]);

 

  return [handlePresent, onDismiss];
};

export default useModal;
