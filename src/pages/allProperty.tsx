import {
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
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
import { addCircle } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getAllPropertys } from "../databaseFunctions";
import { Property } from "../models";
import "./allProperty.css";
const AllProperty: React.FC = () => {
  //list of customers-> will be used in the List component
  const [propertysFilter, setPropertysFilter] = useState<Property[]>([]);
  const [searchProperty, setSearchProperty] = useState("All properties");
  async function fetchData() {
    let allCustomers = await getAllPropertys();
    if (searchProperty != "All properties" && searchProperty) {
      //lọc ra những phần tử có property và bed lớn hơn 2 trùng với loại đang lọc
      allCustomers = allCustomers.filter(
        (element) => element.property == searchProperty
      );
    }
    setPropertysFilter(allCustomers);
  }

  //it will run at least once every time the page is rendered
  useEffect(() => {
    fetchData();
  }, [searchProperty]);

  async function refreshTheData(event: any) {
    await fetchData(); //get the newest data from DB
    setTimeout(() => {
      //wait for system get data from DB
      event.detail.complete(); //done the refreshing=>effect will disapear
      console.log("Refresh completed!");
    }, 1000); //1 second to show refresh icon
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="optionForm">
          <IonSelect
            class="filterProperty"
            placeholder="Property type"
            value={searchProperty}
            onIonChange={(e) => setSearchProperty(e.detail.value)}
          >
            <IonSelectOption value="All properties">All properties</IonSelectOption>
            <IonSelectOption value="Flat">Flat</IonSelectOption>
            <IonSelectOption value="House">House</IonSelectOption>
            <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>
            <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            <IonSelectOption value="Cabin">Cabin</IonSelectOption>
            <IonSelectOption value="Castle">Castle</IonSelectOption>
            <IonSelectOption value="Chalet">Chalet</IonSelectOption>
            <IonSelectOption value="Single Family Detached House">Single Family Detached House</IonSelectOption>
          </IonSelect>
          <a href="/home">
            <IonIcon class="iconAdd" icon={addCircle} color="primary" />
          </a>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={refreshTheData}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {propertysFilter && (
          <IonList inset={true}>
            {propertysFilter.map((c, i) => (
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
      <IonFooter></IonFooter>
    </IonPage>
  );
};

export default AllProperty;
