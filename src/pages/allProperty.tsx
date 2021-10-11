import {
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { getAllPropertys } from "../databasehandler";
import { Property } from "../models";

const AllProperty: React.FC = () => {
  //list of customers-> will be used in the List component
  const [propertys, setPropertys] = useState<Property[]>([]);
  const [searchProperty, setSearchProperty] = useState("");
  const [furnitureFilter, setFurnitureFilter] = useState("");
  async function fetchData() {
    let allCustomers = await getAllPropertys();
    setPropertys(allCustomers);
    console.log(allCustomers);
  }
  //it will run at least once every time the page is rendered
  // useEffect(() => {
  //   fetchData();
  // }, [])
  //it helps to refresh the home when you navigate between pages
  useIonViewWillEnter(() => {
    fetchData();
  });
  async function refreshTheData(event: any) {
    await fetchData(); //to update customer list again
    setTimeout(() => {
      //pause some time to show the effect: refreshing
      event.detail.complete(); //done the refreshing=>effect will disapear
      console.log("Refresh completed!");
    }, 1000); //1 second to show refresh icon
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonSelect placeholder='Property type' onIonChange={(e) => setSearchProperty(e.detail.value)}>
            <IonSelectOption value="Flat">Flat</IonSelectOption>
            <IonSelectOption value="House">House</IonSelectOption>
            <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>
          </IonSelect>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={refreshTheData}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {propertys && (
          <IonList inset={true}>
            {propertys.map((c, i) => (
              <IonItem button key={i} routerLink={"/PropertyDetail/" + c.id}>
                <IonLabel className="ion-text-wrap">
                  <h3>Type: {c.property}</h3>
                  <p>Bedrooms: {c.bedrooms}</p>
                  <p>Furniture: {c.furniture}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
      <IonFooter>
      </IonFooter>
    </IonPage>
  );
};

export default AllProperty;
