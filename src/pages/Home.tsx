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
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useState } from "react";
import "./Home.css";
import { addCircle } from "ionicons/icons";
import { insertProperty } from "../databaseFunctions";

const Home: React.FC = () => {
  const [property, setProperty] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [furniture, setFurniture] = useState("");
  const [notes, setNotes] = useState("");
  const [reporter, setReporter] = useState("");
  const [present, dismiss] = useIonToast();
  const [check, setCheck] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);

  function saveToDb() {
    if (property == "" || !bedrooms || !monthlyRent || reporter == "")
      return setCheck(true);
    if (parseInt(bedrooms) <= 0 || parseInt(monthlyRent) <= 0)
      return setCheckNumber(true);
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
    if (!action) return alert("This information has not been saved!");
    insertProperty(propertyObj).then(() => {
      present("Insert property successfully!", 3000);
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
            <IonSelectOption value="Apartment">Apartment</IonSelectOption>
            <IonSelectOption value="Cabin">Cabin</IonSelectOption>
            <IonSelectOption value="Castle">Castle</IonSelectOption>
            <IonSelectOption value="Chalet">Chalet</IonSelectOption>
            <IonSelectOption value="Single Family Detached House">
              Single Family Detached House
            </IonSelectOption>
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
          {checkNumber && parseInt(bedrooms) <= 0 && <p>Number of bedroom is positive number!</p>}
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Monthly rent price: (Unit:$) <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonInput
            type="number"
            placeholder="Enter monthly rent price"
            onIonChange={(e) => setMonthlyRent(e.detail.value!)}
          ></IonInput>
          {check && !monthlyRent && <p>Monthly rent is required!</p>}
          {checkNumber && parseInt(monthlyRent) <= 0 && <p>Monthly rent must be greate than 0!</p>}
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
