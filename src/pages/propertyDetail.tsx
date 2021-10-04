import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSelect,
  IonSelectOption,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { call, person } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getProperty,
  updateProperty,
  deleteProperty,
} from "../databasehandler";
import { Property } from "../models";

interface ParamId {
  id: string;
}

const PropertyDetail: React.FC = () => {
  const { id } = useParams<ParamId>();
  const [property, setProperty] = useState("");
  const [bedrooms, setBedrooms] = useState<number>();
  const [monthlyRent, setMonthlyRent] = useState<number>();
  const [furniture, setFurniture] = useState("");
  const [notes, setNotes] = useState("");
  const [reporter, setReporter] = useState("");
  const [time, setTime] = useState("");

  async function fetchData() {
    let PropertyDetail = await getProperty(Number.parseInt(id));
    setProperty(PropertyDetail.property);
    setBedrooms(PropertyDetail.bedrooms);
    setMonthlyRent(PropertyDetail.monthlyRent);
    setFurniture(PropertyDetail.furniture);
    setNotes(PropertyDetail.notes);
    setReporter(PropertyDetail.reporter);
    setTime(PropertyDetail.time);
  }

  async function handleDelete() {
    //call databaseHandle to delete the current customer
    let r = window.confirm("Are you sure to delete this ");
    console.log("your action", r);
    if (!r) {
      alert("You cancelled!");
    } else {
      await deleteProperty(Number.parseInt(id));
      // eslint-disable-next-line no-restricted-globals
      history.back();
    }
  }

  function updateHandle() {
    if (
      property == "" ||
      !bedrooms ||
      !monthlyRent ||
      furniture == "" ||
      notes == "" ||
      notes == "" ||
      reporter == ""
    )
      return alert("hãy nhập hết tất cả thông tin cần thiết");
    //call databaseHandler to update the current customer
    var propertyỌbj = {
      id:Number.parseInt(id),
      property: property,
      bedrooms: bedrooms,
      monthlyRent: monthlyRent,
      furniture: furniture,
      notes: notes,
      reporter: reporter,
      time: new Date().toLocaleDateString("vi-VN"),
    };
    updateProperty(propertyỌbj);
    alert("Update done!");
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
          <IonButtons slot="start">
          <IonBackButton defaultHref="/allProperty" />
          </IonButtons>
          <IonTitle>Property Detail</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={refreshTheData}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonItem>
          <IonLabel position="stacked">Property type</IonLabel>
          <IonSelect
            value={property}
            onIonChange={(e) => setProperty(e.detail.value)}
          >
            <IonSelectOption value="Flat">Flat</IonSelectOption>
            <IonSelectOption value="House">House</IonSelectOption>
            <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Bedrooms:</IonLabel>
          <IonInput
            value={bedrooms}
            type="number"
            placeholder="Enter Number of bedrooms"
            onIonChange={(e) => setBedrooms(parseInt(e.detail.value!, 10))}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Monthly rent price:</IonLabel>
          <IonInput
            value={monthlyRent}
            type="number"
            placeholder="Enter monthly rent price"
            onIonChange={(e) => setMonthlyRent(parseInt(e.detail.value!, 10))}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Furniture types:</IonLabel>
          <IonSelect
            value={furniture}
            onIonChange={(e) => setFurniture(e.detail.value)}
          >
            <IonSelectOption value="Furnished">Furnished</IonSelectOption>
            <IonSelectOption value="Unfurnished">Unfurnished</IonSelectOption>
            <IonSelectOption value="Part Furnished">
              Part Furnished
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Notes:</IonLabel>
          <IonInput
            value={notes}
            type="text"
            onIonChange={(event) => setNotes(event.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Name of the reporter:</IonLabel>
          <IonInput
            value={reporter}
            type="text"
            onIonChange={(event) => setReporter(event.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonButton onClick={updateHandle} expand="block" color="primary">
          Update
        </IonButton>
        <IonButton onClick={handleDelete} expand="block" color="danger">
          Delete
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default PropertyDetail;
