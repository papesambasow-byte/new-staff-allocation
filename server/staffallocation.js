const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const SequelizeStore = require("connect-session-sequelize");
const StaffRoute = require("./router/StaffRoute.js");
const AuthRoute = require("./router/AuthRoute.js");
const UserRouter = require("./router/UserRouter.js");
const AuditTrailRoute = require("./router/AuditTrailRoute.js");
const db = require('./DatabaseConfig/Database.js');
const VoiceRouter = require("./router/VoiceRouter.js")
const DataRouter = require("./router/DataRouter.js")
const RetriveRouter = require("./router/RetriveRouter.js")
const StaffAllocationBulkUpload = require("./StaffAllocationBulkUpload.js")
const PythonRouter = require('./router/PythonRouter.js')
const StaffInformationRouter = require('./router/StaffInformationRouter.js')
const EmailNotificationRoute = require('./router/EmailNotificationRoute.js')
const DepartmentRoute = require('./router/DepartmentRoute.js')
const cookieParser = require("cookie-parser")
const app = express();

app.use(express.json());
app.use(express.static('./public'));

app.use(cookieParser());

// body-parser middleware use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

(async () => {
    try {
      await db.sync();
      console.log('Database synced successfully.');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  })();
  
app.use(flash());

app.use(session({
    secret: process.env.SESS_SECRET = "secret",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

// Use cors middleware before defining routes
app.use(cors({
    credentials: true,
    origin: "http://172.25.160.235:2502"
}));



app.use(StaffRoute);
app.use(AuthRoute);
app.use(UserRouter);
app.use(AuditTrailRoute);
app.use(VoiceRouter);
app.use(DataRouter);
app.use(RetriveRouter);
app.use(StaffAllocationBulkUpload);
app.use(PythonRouter);
app.use(StaffInformationRouter);
app.use(EmailNotificationRoute);
app.use(DepartmentRoute);

dotenv.config();
const PORT = process.env.PORT || 2402;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
