import {
  IonButton,
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
  const [bedrooms, setBedrooms] = useState<number>();
  const [monthlyRent, setMonthlyRent] = useState<number>();
  const [furniture, setFurniture] = useState("");
  const [notes, setNotes] = useState("");
  const [reporter, setReporter] = useState("");
  const [present, dismiss] = useIonToast();

  function saveToDb() {
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
    var propertyỌbj = {
      property: property,
      bedrooms: bedrooms,
      monthlyRent: monthlyRent,
      furniture: furniture,
      notes: notes,
      reporter: reporter,
      time: new Date().toLocaleDateString("vi-VN"),
    };
    insertProperty(propertyỌbj).then(() => {
      present("Insert customer successfully!", 3000);
    });
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add property</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add property</IonTitle>
          </IonToolbar>
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
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Bedrooms: <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonInput
            type="number"
            placeholder="Enter Number of bedrooms"
            onIonChange={(e) => setBedrooms(parseInt(e.detail.value!, 10))}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Monthly rent price: <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonInput
            type="number"
            placeholder="Enter monthly rent price"
            onIonChange={(e) => setMonthlyRent(parseInt(e.detail.value!, 10))}
          ></IonInput>
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
        </IonItem>
        <IonButton onClick={saveToDb} expand="block" color="tertiary">
          <IonLabel>Save</IonLabel>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
