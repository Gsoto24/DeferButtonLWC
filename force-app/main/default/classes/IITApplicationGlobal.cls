global with sharing class IITApplicationGlobal {//Global wrapper class for application handler
	webservice static String forceFlows(Id applicationId) {//Forces a flow update on one application
		TargetX_SRMb__Application__c applicationToForce = [Select Id
		, IIT_Dont_Run_Processes__c
		FROM TargetX_SRMb__Application__c
		WHERE id = :applicationId
		LIMIT 1
		FOR UPDATE];

		try{
			IITApplicationHandler.forceFlows(applicationToForce);
		} catch(Exception exceptionCaught) {
			return exceptionCaught.getMessage();
		}

		return 'Update Successful.';
	}

	@AuraEnabled
    webservice static void deferApplication(Id applicationId) {//Defers an application
		try {
			List<Id> applicationIds = new List<Id>();
            applicationIds.add(applicationId);
			IITApplicationHandler.deferApplications(applicationIds);
		} catch(Exception exceptionCaught) {//Catch any errors
			IITExceptionHandler.sendExceptionEmail(exceptionCaught); //Send error messaging
			//return exceptionCaught.getMessage();
		}

		//return 'Defer Successful.';
	}
}