
# Incluit Challenge - BASTÓ

El siguiente challenge es presentado por el equipo BASTÓ encargados de la digitalizacion del campo.

Se solicita una creacion de un formulario CRUD de datos de vacas.



## API Reference

#### Get all animals

```http
  GET /api/establishment/
```

#### Get Animal by Senasa-ID

```http
  GET /api/establishment/${idSenasa}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `idSenasa`      | `string` | **Required**.  |

#### Put Animbal by Senasa-ID

```http
  PUT /api/establishment/${idSenasa}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `idSenasa`      | `string` | **Required**.  |
| `typeOfAnimal`      | `string` | -  |
| `animalWeight`      | `string` |  - |
| `pastureName`      | `string` |  - |
| `deviceType`      | `string` |  - |
| `deviceNumber`      | `string` | -  |

#### Delete Animbal by Senasa-ID

```http
  DELETE /api/establishment/${idSenasa}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `idSenasa`      | `string` | **Required**.  |

#### Post  Create Animal

```http
  POST /api/establishment
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `idSenasa`      | `string` | Max Lenght 16  |
| `typeOfAnimal`      | `string` | Novillo , Toro , Vaquillona  |
| `animalWeight`      | `string` |  - |
| `pastureName`      | `string` |  Max Lenght 200 |
| `deviceType`      | `string` |  Collar , Caravana |
| `deviceNumber`      | `string` | Max Length 8  |





## Deployment

To deploy this project run

```bash
  npm run dev
```

```bash
  npm run webpack
```

```bash
  http://localhost:4000/
```

