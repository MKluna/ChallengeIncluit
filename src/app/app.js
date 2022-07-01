import React, { Component } from "react";
import Select from "react-select";
import { animalSchema } from "./validations/animalValidations";
import * as yup from "yup";

const typeOfAnimal = [
  { value: "novillo", label: "Novillo" },
  { value: "toro", label: "Toro" },
  { value: "vaquillona", label: "Vaquillona" },
];

const deviceType = [
  { value: "collar", label: "Collar" },
  { value: "caravana", label: "Caravana" },
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      idSenasa: "",
      typeOfAnimal: "",
      animalWeight: "",
      pastureName: "",
      deviceType: "",
      deviceNumber: "",
      animals: [],
      _id: "",
    };
    this.saveAnimal = this.saveAnimal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChangeTypeOfAnimal =
      this.handleSelectChangeTypeOfAnimal.bind(this);
    this.handleSelectChangeDeviceType =
      this.handleSelectChangeDeviceType.bind(this);
  }

  componentDidMount() {
    this.getAnimals();
  }

  async saveAnimal(e) {
    e.preventDefault();
    if (this.state._id) {
      await fetch(`/api/establishment/${this.state.idSenasa}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          res.json(), console.log(res);
        })
        .then((data) => {
          console.log("data: ", data);
          this.setState({
            idSenasa: "",
            typeOfAnimal: "",
            animalWeight: "",
            pastureName: "",
            deviceType: "",
            deviceNumber: "",
            _id: "",
          });
          this.getAnimals();
          window.M.toast({ html: "Animal Actualizado Correctamente" });
        })
        .catch((err) => {
          console.log("err: ", err);
          window.M.toast({ html: "Error al actualizar el animal" });
        });
    } else {
      try {
        await animalSchema.validate(this.state);
      } catch (error) {
        return window.M.toast({ html: String(error).slice(17) });
      }

      await fetch("/api/establishment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            idSenasa: "",
            typeOfAnimal: "",
            animalWeight: "",
            pastureName: "",
            deviceType: "",
            deviceNumber: "",
          });
          this.getAnimals();
          window.M.toast({ html: "Animal guardado correctamente" });
        })
        .catch((error) => {
          console.error("Error:", error);
          window.M.toast({ html: "Error Al guardar el animal" });
        });
    }
  }

  getAnimals() {
    fetch("/api/establishment")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ animals: data });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSelectChangeTypeOfAnimal(e) {
    const { value } = e;
    this.setState({
      typeOfAnimal: value,
    });
  }

  handleSelectChangeDeviceType(e) {
    const { value } = e;
    this.setState({
      deviceType: value,
    });
  }

  deleteAnimal(idSenasa) {
    if (confirm("¿Eliminar Animal?")) {
      fetch(`/api/establishment/${idSenasa}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          window.M.toast({ html: "Animal Borrado Correctamente" });
          this.getAnimals();
        })
        .catch((err) => {
          console.log(err);
          window.M.toast({ html: "Error al eliminar el animal" });
        });
    }
  }

  editAnimal(idSenasa) {
    fetch(`/api/establishment/${idSenasa}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          idSenasa: data.idSenasa,
          typeOfAnimal: data.typeOfAnimal,
          animalWeight: data.animalWeight,
          pastureName: data.pastureName,
          deviceType: data.deviceType,
          deviceNumber: data.deviceNumber,
          _id: data._id,
        });
      });
  }

  render() {
    return (
      <div>
        {/* Navigation */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              ABM
            </a>
          </div>
        </nav>

        <div className="container">
          <div className="row">
            <div className="col s3">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.saveAnimal}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.idSenasa}
                          onChange={this.handleChange}
                          name="idSenasa"
                          type="text"
                          placeholder="ID Senasa"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <Select
                          value={this.state.typeOfAnimal}
                          name="typeOfAnimal"
                          placeholder={
                            this.state.typeOfAnimal
                              ? this.state.typeOfAnimal
                              : "-- Tipo de Animal --"
                          }
                          options={typeOfAnimal}
                          onChange={this.handleSelectChangeTypeOfAnimal}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.animalWeight}
                          onChange={this.handleChange}
                          name="animalWeight"
                          type="text"
                          placeholder="Peso del Animal"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.pastureName}
                          onChange={this.handleChange}
                          name="pastureName"
                          type="text"
                          placeholder="Nombre del Potrero"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <Select
                          value={this.state.deviceType}
                          name="deviceType"
                          options={deviceType}
                          placeholder={
                            this.state.deviceType
                              ? this.state.deviceType
                              : "-- Tipo de Dispositivo --"
                          }
                          onChange={this.handleSelectChangeDeviceType}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          value={this.state.deviceNumber}
                          name="deviceNumber"
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Numero de Dispositivo"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Guardar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s9">
              <table className="centered">
                <thead>
                  <tr>
                    <th>ID-SENASA</th>
                    <th>Tipo De Animal</th>
                    <th>Peso</th>
                    <th>Nombre del Potrero</th>
                    <th>Tipo de Dispositivo</th>
                    <th>Numero de dispositivo</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.animals.map((a) => {
                    return (
                      <tr key={a._id}>
                        <td>{a.idSenasa}</td>
                        <td>{a.typeOfAnimal}</td>
                        <td>{a.animalWeight}</td>
                        <td>{a.pastureName}</td>
                        <td>{a.deviceType}</td>
                        <td>{a.deviceNumber}</td>
                        <td>
                          <button
                            onClick={() => this.deleteAnimal(a.idSenasa)}
                            className="btn light-blue darken-4"
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <button
                            onClick={() => this.editAnimal(a.idSenasa)}
                            className="btn light-blue darken-4"
                            style={{ margin: "4px" }}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
