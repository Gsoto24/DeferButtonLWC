import { LightningElement, api } from 'lwc';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
import deferApplication from  '@salesforce/apex/IITApplicationGlobal.deferApplication'

export default class Lwc_QuickAction extends LightningElement {
    @api recordId;

    closeAction(){
        this.dispatchEvent(new CloseActionScreenEvent());
    }

    // showToast()
    // {
    //     this.isLoaded = true;
    //     const event = new ShowToastEvent({
    //         title: 'Saved!',
    //         variant: 'success',
    //     });
    //     this.dispatchEvent(event);
        
    // }        
    

    callDeferApexClass()
    {

        // Close moodule
        this.dispatchEvent(new CloseActionScreenEvent());

        // Call apex class to get BP records using the userID from @salesforce/user/Id
        deferApplication({applicationId:this.recordId}).then(response=>{
            const event = new ShowToastEvent({
                title: 'Defer request sent!',
                variant: 'success',
            });
            this.dispatchEvent(event);              
            
        }).catch(error =>{

            const event = new ShowToastEvent({
            title: 'Error sending defer request. Please contact studentsystem@iit.edu',
            variant: 'error',
            });
            this.dispatchEvent(event);  
            console.error(error);
        })
    }



}

// IITApplicationGlobal","deferApplication",