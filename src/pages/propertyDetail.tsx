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
  useIonViewWillEnter,
} from "@ionic/react";
import { addCircle } from "ionicons/icons";
import { useState } from "react";
import { useParams } from "react-router";
import {
  getProperty,
  updateProperty,
  deleteProperty,
} from "../databaseFunctions";

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
  const [check, setCheck] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);
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
    let action = window.confirm("Are you sure to delete this property?");
    if (!action) return alert("Action cancelled!");
    await deleteProperty(Number.parseInt(id));
    // eslint-disable-next-line no-restricted-globals
    history.back();
  }

  function updateHandle() {
    if (property == "" || !bedrooms || !monthlyRent || reporter == "")
      return setCheck(true);
    if (bedrooms <= 0 || monthlyRent <= 0) return setCheckNumber(true);
    //call databaseHandler to update property information
    var propertyObj = {
      id: Number.parseInt(id),
      property: property,
      bedrooms: bedrooms,
      monthlyRent: monthlyRent,
      furniture: furniture,
      notes: notes,
      reporter: reporter,
      time: new Date().toLocaleDateString("vi-VN"),
    };
    updateProperty(propertyObj);
    alert("Update success!");
  }

  //Refresh data when navigate between pages
  useIonViewWillEnter(() => {
    fetchData();
  });

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
        <IonItem>
          <IonLabel position="stacked">
            Property type <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonSelect
            value={property}
            onIonChange={(e) => setProperty(e.detail.value)}
          >
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
            Bedrooms:
            <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonInput
            value={bedrooms}
            type="number"
            placeholder="Enter Number of bedrooms"
            onIonChange={(e) => setBedrooms(parseInt(e.detail.value!, 10))}
          ></IonInput>
          {check && !bedrooms && <p>Number of bedroom is required!</p>}
          {checkNumber && bedrooms && bedrooms <= 0 && (
            <p>Number of bedroom is positive number!</p>
          )}
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Monthly rent price:
            <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonInput
            value={monthlyRent}
            type="number"
            placeholder="Enter monthly rent price"
            onIonChange={(e) => setMonthlyRent(parseInt(e.detail.value!, 10))}
          ></IonInput>
          {check && !monthlyRent && <p>Monthly rent is required!</p>}
          {checkNumber && monthlyRent && monthlyRent <= 0 && (
            <p>Monthly rent must be greate than 0!</p>
          )}
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
          <IonLabel position="stacked">
            Name of the reporter:
            <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonInput
            value={reporter}
            type="text"
            onIonChange={(event) => setReporter(event.detail.value!)}
          ></IonInput>
          {check && reporter.length == 0 && (
            <p>Name of reporter is required!</p>
          )}
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">
            Time added:
            <IonIcon icon={addCircle} color="danger" />
          </IonLabel>
          <IonInput
            value={time}
            type="text"
            readonly
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
