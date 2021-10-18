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
  IonSelect,
  IonSelectOption,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToast,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import "./Home.css";
import {
  addCircle,
  call,
  person,
  personCircle,
  shareSocialSharp,
} from "ionicons/icons";
import { insertProperty } from "../databasehandler";
import { start } from "repl";

const Home: React.FC = () => {
  const [property, setProperty] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [furniture, setFurniture] = useState("");
  const [notes, setNotes] = useState("");
  const [reporter, setReporter] = useState("");
  const [present, dismiss] = useIonToast();
  const [check, setCheck] = useState(false);

  // function checkBedRoom(){
  //   if(bedrooms) return true;
  //   if(!bedrooms) return false;
  // }

  function handleVibration() {
    //vibrating for 2 seconds
    navigator.vibrate(2000);
    console.log("vibration for 2 seconds");
  }

  function saveToDb() {
    if (property == "" || !bedrooms || !monthlyRent || reporter == "")
      return setCheck(true);
    var propertyObj = {
      property: property,
      bedrooms: parseInt(bedrooms),
      monthlyRent: parseInt(monthlyRent),
      furniture: furniture,
      notes: notes,
      reporter: reporter,
      time: new Date().toLocaleDateString("vi-VN"),
    };
    let action = window.confirm(
      "Are you sure that input information is corrected ?"
    );
    if (!action) return alert("You don't save this property!");
    insertProperty(propertyObj).then(() => {
      present("Insert customer successfully!", 3000);
    });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class="toolBar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/allProperty" />
          </IonButtons>
          <IonTitle class="tiltle">Add property</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar></IonToolbar>
        </IonHeader>
        <IonItem>
          <IonLabel position="stacked">
            Property type: <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonSelect onIonChange={(e) => setProperty(e.detail.value)}>
            <IonSelectOption value="Flat">Flat</IonSelectOption>
            <IonSelectOption value="House">House</IonSelectOption>
            <IonSelectOption value="Bungalow">Bungalow</IonSelectOption>
          </IonSelect>
          {check && property.length == 0 && <p>Property type is required!</p>}
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Bedrooms: <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonInput
            type="number"
            placeholder="Enter Number of bedrooms"
            onIonChange={(e) => setBedrooms(e.detail.value!)}
          ></IonInput>
          {check && !bedrooms && <p>Number of bedroom is required!</p>}
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Monthly rent price: <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonInput
            type="number"
            placeholder="Enter monthly rent price"
            onIonChange={(e) => setMonthlyRent(e.detail.value!)}
          ></IonInput>
          {check && !monthlyRent && <p>Monthly rent is required!</p>}
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Furniture types:</IonLabel>
          <IonSelect
            multiple={true}
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
            type="text"
            onIonChange={(event) => setNotes(event.detail.value!)}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Reporter: <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonInput
            type="text"
            onIonChange={(event) => setReporter(event.detail.value!)}
          ></IonInput>
          {check && reporter.length == 0 && (
            <p>Name of reporter is required!</p>
          )}
        </IonItem>
        <IonButton onClick={saveToDb} expand="block" color="tertiary">
          <IonLabel>Save</IonLabel>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
