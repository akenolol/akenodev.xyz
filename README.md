
# Akeno Dev Website

The website for echoanime.xyz

![Discord](https://img.shields.io/discord/1014190469628055552?style=plastic)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

____

## Authors

- [@akenolol](https://www.github.com/akenolol)
- [@Furdox](https://github.com/Furdox)


## Reference

#### Access Home Page

```http
  GET /
```


#### Access Redirect Page

```http
  GET /redirect
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `url` | `string` | **Required**. The URL to redirect to.|

### Access Status Page

```http
  GET /status
```


___


## Run Locally

Clone the project

```bash
  git clone https://github.com/akenolol/akenolol.github.io
```

Go to the project directory

```bash
  cd akenolol.github.io
```

Install dependencies

```bash
  npm install
```

Edit `config.js` to fit your needs.


Start the server

```bash
  npm run start
```

