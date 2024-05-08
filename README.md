### Description

Server part of Blog with GraphQL, Apollo Server and Prisma ORM.<br>

### How to run project

Create .env file with variable:<br>
DATABASE_URL = url for connect to db
<br>JSON_SIGNATURE random string for using in jsonwebtoken library for token

#### Install Dependencies:

```
$ npm install
```

#### Run Docker Containers for host the postgresqlPostgreSQL DB and create DB with name example: "blog_db"

```
$ docker-compose up
```

#### Running the app:

```
# development
$ npm run start:dev

# production mode
$ npm run build
$ npm run start
```

#### Running Prisma Studio for explore and manipulate data in Prisma project:

```
npx prisma studio
```

### Query Examples

```
mutation { # create new user
  signup(credentials: {
    email: "",
    password: "",
  }, name: "", bio: "") {
    userErrors {
      message
    }
    token
  }
}
```

```
mutation { # auth
  signin(credentials: {
    email: "",
    password: ""
  }) {
    userErrors {
      message
    }
    token
  }
}
```

```
mutation { # create new post for auth user
  postCreate(post: {
    title: "",
    content: ""
  }) {
    userErrors {
      message
    }
    post {
      title
    }
  }
}
```

```
mutation { # update own user post
  postUpdate(
    ) {
    userErrors {
      message
    }
    post {
      title
    }
  }
}
```

```
mutation { # delete own user post
  postDelete(postId: "") {
    userErrors {
      message
    }
    post {
      id
    }
  }
}
```

```
mutation { # postPublish/postUnpublish own user post
  postPublish(postId: "") {
    userErrors {
      message
    }
    post {
      title
    }
  }
}
```

```
query { # show profile
  profile(userId: "") {
    bio
    user {
      name
      posts {
        title
        published
      }
    }
  }
}
```

```
query { # list of all published posts
  posts {
    id
    title
    content
  }
}
```
