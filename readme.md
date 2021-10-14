# Node MINI-YOUTUBE

This site allows you to upload videos with the following information: title, description, tags additionally you can like or dislike the videos and add comments.

You can manage the search of the videos through tags or with words contained in the video titles.

## Installation

* Have previously installed Node.js (Latest stable version)
* Have previously installed GIT (Latest stable version)
* Open terminal or command line
* Go to the path where you will clone the project
* Clone the repository
```bash
git clone https://github.com/cyalvarez/mini-youtube
```
* Enter the project folder
```bash
cd MINI-YOUTUBE
```
* Install dependencies
```bash
npm install
```
* Paste the provided .env file in the root of the project or create .env file with the database credentials
* run the project
```bash
npm run start
```

## Use

### Local

* Open browser
* Enter http: // localhost: 3000 /
* Verify that you can see the CYtube site


### Commands

#### Run tests
```bash
npm  test
```

## REST API

### Create video

#### Request

`POST /api/video`

#### Body form-data

Example

   title     
   description
   tags    
   image   
   video    


#### Response

    Status Code: 201 Created 

### Get videos

#### Request

`GET /api/videos`

#### Response

    Status Code: 200 OK 
   [
       {
         "_id": "61677744e97885da73f263b9",
         "title": "Prueba tags",
         "description": "prueba",
         "img":string base 64
       }
   ]

### Update likes video

#### Request

`PATCH /api/video/likes/:id`

#### Response
    Status Code: 200 OK
    {"likes": 4}


### Update dislikes video

#### Request

`PATCH /api/video/dislikes/:id`

#### Response
    Status Code: 200 OK
    {"dislikes": 4}

### Create comment video

#### Request

`POS /api/comment`

#### Body

Example

    {
     "comment":"Prueba comment",
     "idvideo":"616719528753010a78e56e6e"
    }

#### Response
    Status Code: 201 Created
   {
    "comment": "Prueba comment",
    "idvideo": "616719528753010a78e56e6e",
    "_id": "61677f8517dce67ff618c515",
    "createdAt": "2021-10-14T00:53:25.776Z",
    "updatedAt": "2021-10-14T00:53:25.776Z",
    "__v": 0
  }