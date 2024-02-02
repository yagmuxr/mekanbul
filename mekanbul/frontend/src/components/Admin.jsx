import Header from "./Header";
import VenueList from "./VenueList";
import VenueReducer from "../services/VenueReducer";
import React from "react";
function Admin() {
  const [venues, dispatchVenues] = React.useReducer(VenueReducer, {
    data: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    isDeleted: false,
  });
  function handleClick(evt, id) {
    if (evt.target.name === "Mekan Ekle") {
      navigate(`/admin/addupdate/venue/new`, { state: { action: "new" } });
    }

    if (evt.target.name === "Güncelle") {
      navigate(`/admin/addupdate/venue/${id}`, { state: { action: "update" } });
    }

    if (evt.target.name === "Sil") {
      VenueDataService.removeVenue(id).then((response) => {
        console.log("Başarılı");
        setDeleteCtrl(true);
      });
    }
  }
  return (
    <>
      <Header headerText="Yönetici" motto="Mekanlarınızı Yönetin!" />
      {venues.isError ? (
        <p>
          <strong>Birşeyler ters gitti! ...</strong>
        </p>
      ) : venues.isLoading ? (
        <p>
          <strong>Mekanlar Yükleniyor ...</strong>
        </p>
      ) : (
        venues.isSuccess && (
          <div className="row">
            <VenueList
              venues={venues.data}
              admin={true}
              onClick={handleClick}
            />
          </div>
        )
      )}
    </>
  );
}

export default Admin;
