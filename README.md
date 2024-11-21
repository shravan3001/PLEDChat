# PLEDChat

Code along for ["React, Typescript, Django, Channels and DRF. Building a live chat application."](https://www.udemy.com/course/full-stack-react-django-drf-channels-project-djchat/) - Very Academy

---

### Major Topics

#### Backend

- Django
- Django Rest Framework
- Django Channels
- Drf Spectacular (SwaggerUI)
- WebSockets (JSON)
- ASGI server (Uvicorn)
- CORS
- Authentication
  - SimpleJWT

#### Frontend

- React
- React Hooks for CRUD Transactions
- Vite (Bundling and Development)
- Typescript
- Material UI (mui)
- Custom Reusable Components
- Dark Mode

#### Commands

Starting Backend  
`cd PLEDChat/pledchat`  
`uvicorn pledchat.asgi:application --port 8000 --workers 4 --log-level debug --reload`

Starting Frontend  
`cd PLEDChat/reactchat`  
`npm run dev`
