import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchJSON } from "../utils/api";

const useFetchLetOut = () => {
  const { accessToken } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState();

  useEffect(() => {
    if (!accessToken) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchJSON<string>(
          "https://crs.carnet.pl/api/v1/os/rental/reservations/get",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({"startPlannedDate":{"sort":1,"compute":true},"startDepartmentId":{"oneOf":[6],"compute":true},"state":{"oneOf":[1],"compute":true},"returnDepartmentId":{"oneOf":[],"compute":true},"visibilityScopeRestriction":2,"paging":{"skip":0,"take":50},"id":{"compute":true},"typeId":{"compute":true},"carModels":{"compute":true},"carRegistrationNumber":{"compute":true},"returnPlannedDate":{"compute":true},"clientName":{"compute":true},"letOutAcriss":{"compute":true},"lastNote":{"compute":true},"carOwningDepartmentNames":{"compute":true},"notes":{"compute":true},"startDate":{"compute":true},"returnDate":{"compute":true},"orderedAcriss":{"compute":true},"isReturnAppointed":{"compute":true},"reservationPaidStatus":{"compute":true},"onRequest":{"compute":true},"number":{"compute":true},"businessLine":{"compute":true},"isCarPrepared":{"compute":true},"isRelocationNeeded":{"compute":true},"carReplacementPlannedDate":{"compute":true},"closureDate":{"compute":true},"lastNoteActionRequiredBy":{"compute":true},"clientEmail":{"compute":true},"purchaserName":{"compute":true},"carUsersNames":{"compute":true},"carUsersEmails":{"compute":true},"carUsersPhones":{"compute":true},"rentUnitOfMeasure":{"compute":true},"contractorCostCenter":{"compute":true},"additionalEquipmentTypes":{"compute":true},"partnerIntegrationErrors":{"compute":true},"startDepartmentGroupId":{"compute":true},"takeBackActualDelayMinutes":{"compute":true},"returnDepartmentGroupId":{"compute":true},"rentDaysLength":{"compute":true},"creationDate":{"compute":true},"creatorName":{"compute":true},"clientGuardianName":{"compute":true},"responsibleUserName":{"compute":true},"merchantName":{"compute":true},"returnQuestionMailSent":{"compute":true},"isLetOutConfirmed":{"compute":true},"isReturnConfirmed":{"compute":true},"dateOfContactWithClient":{"compute":true},"invoicedClassType":{"compute":true},"rentalPricelistName":{"compute":true},"notPaidOnllinePaymentLinkGenerationTime":{"compute":true},"areAllPositionsInvoiced":{"compute":true},"invoicingMethod":{"compute":true},"wasInvoicedInMonth":{"compute":true},"wasClosedManually":{"compute":true},"blockLetoutReasonsList":{"compute":true},"integrationIds":{"compute":true},"clientIntegrationIds":{"compute":true},"purchaserIntegrationIds":{"compute":true},"hasCarPickUpAuthorization":{"compute":true},"eventTypeIds":{"compute":true},"clientId":{"compute":true},"isLetOutOrReturnDelayed":{"compute":true},"integrationsDefinition":{"compute":true},"clientIntegrationsDefinition":{"compute":true},"purchaserIntegrationsDefinition":{"compute":true},"rentServingCompanyEntityId":{"compute":true}}),
          }
        );

        return data;
      } catch (err) {
        setError((err as Error).message);
        return null;
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [accessToken]);

  return { data, loading, error };
};

export default useFetchLetOut;
