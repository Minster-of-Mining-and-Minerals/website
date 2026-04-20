const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();

const { swaggerUi, swaggerSpec } = require("./swagger");

// ================== Here Import Routes=================

// ================== User Routes ==========================
const userRoute = require("./routers/user-routes/userRoutes");
const roleRoute = require("./routers/user-routes/roleRoutes");
const userRoleRoute = require("./routers/user-routes/userRoleRoutes");
const authRoute = require("./routers/user-routes/authRoutes");
const permissionRoute = require("./routers/user-routes/permissionRoutes");
const changePasswordRoutes = require("./routers/user-routes/passwordChangeRoutes");

// ================== News Routes ==========================
const newsRoute = require("./routers/news/newsRoutes");
const tagRoute = require("./routers/news/tagRoutes");

// ================== Service Routes ==========================
const serviceRoute = require("./routers/sevice/serviceRoutes");

// ================== About Page Routes ==========================
const backgroundRoute = require("./routers/about/backgroundRoutes");
const leadershipRoute = require("./routers/about/leadershipRoutes");
const strategyRoute = require("./routers/about/strategyRoutes");

// ================== Contact Page Routes ==========================
const federalOfficeRoute = require("./routers/contact/federalOfficeRoutes");
const regionRoute = require("./routers/contact/regionRoutes");
const regionalOfficeRoute = require("./routers/contact/regionalOfficeRoutes");
const messageRoute = require("./routers/contact/messageRoutes");

// ================== Footer Page Routes ==========================
const socialMediaRoute = require("./routers/footer/socialMediaRoutes");
const footerRoute = require("./routers/footer/footerRoutes");

// ================== Hero Section Routes ==========================
const cardRoute = require("./routers/hero/cardRoute");
const sliderRoute = require("./routers/hero/sliderRoute");
const partnerRoute = require("./routers/hero/partnerRoute");

// ================== Sector Routes ==========================
const gamestoneRoute = require("./routers/sectors/mining/gamestoneRoutes");
const resourceRoute = require("./routers/sectors/resourceRoutes");
const snapshotRoute = require("./routers/sectors/snapshotRoutes");
const petroleumObjectiveRoute = require("./routers/sectors/petroleum/petroleumObjectiveRoutes");
const petroleumProcessRoute = require("./routers/sectors/petroleum/petroleumProcessRoutes");
const petroleumRegulationRoute = require("./routers/sectors/petroleum/petroleumProcessRegulationRoutes");
const miningApplicationProcessRoute = require("./routers/sectors/mining/miningApplicationProcessRoutes");
const miningRegulationProcessRoute = require("./routers/sectors/mining/miningRegulationProcessRoutes");

// ================== ASM Routes ==========================
const asmRoute = require("./routers/asm/asmRoutes");

// ================== Investigate Ethiopia Routes ==========================
const investigateEthiopiaRoute = require("./routers/investigate_ethiopia/investigateEthiopiaRoutes");

// ================== Attachment Routes ==========================
const attachmentRoute = require("./routers/attachement/attachementRoutes");

// ================== Event Routes ==========================
const eventRoute = require("./routers/event/eventRoutes");
const eventCategoryRoute = require("./routers/event/eventCategoryRoutes");

// ================== System Routes ==========================
const auditLogRoute = require("./routers/system/auditLogRoutes");
const dashboardRoute = require("./routers/system/dashboardRoutes");

const app = express();
const appServer = http.createServer(app);

app.use(
  express.json({
    verify: (req, res, buf) => {
      if (!buf.length) return; // allow empty body
      try {
        JSON.parse(buf);
      } catch (e) {
        // Don't throw the error after sending response
        const error = new Error("Invalid JSON payload");
        error.status = 400;
        error.expose = true;
        throw error;
      }
    },
  }),
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// ===========Serve static files (PDFs, uploads)=====================
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, filePath) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      if (filePath.endsWith(".pdf")) {
        res.set("Content-Disposition", "inline");
      }
    },
  }),
);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS");
      res.set("Access-Control-Allow-Headers", "Content-Type");
    },
  }),
);

// ================== CORS Configuration ==================
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:4000",
  process.env.FRONTEND_URL,
];
const corsOptions = {
  origin: true, // Allow all origins for development
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// ================== Database Connection ==================
const { sequelize } = require("./models");

sequelize
  .authenticate()
  .then(() => console.log(" Database connected successfully"))
  .catch((err) => console.error(" Database connection error:", err));

// ================== Swagger Setup ==================
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ================== API Routes go here ==================

// ================== User Routes ==========================
app.use("/api/users", userRoute);
app.use("/api/roles", roleRoute);
app.use("/api/user-roles", userRoleRoute);
app.use("/api/auth", authRoute);
app.use("/api/change-password", changePasswordRoutes);
app.use("/api/permissions", permissionRoute);

// ================== News Routes ==========================
app.use("/api/news", newsRoute);
app.use("/api/tags", tagRoute);

// ================== Service Routes ==========================
app.use("/api/services", serviceRoute);

// ================== About Page Routes ==========================
app.use("/api/backgrounds", backgroundRoute);
app.use("/api/leadership", leadershipRoute);
app.use("/api/strategy", strategyRoute);

// ================== Contact Page Routes ==========================
app.use("/api/federal-office", federalOfficeRoute);
app.use("/api/region", regionRoute);
app.use("/api/regional-offices", regionalOfficeRoute);
app.use("/api/message", messageRoute);

// ================== Footer Page Routes ==========================
app.use("/api/social-media", socialMediaRoute);
app.use("/api/footer", footerRoute);

// ================== Hero Section Routes ==========================
app.use("/api/cards", cardRoute);
app.use("/api/sliders", sliderRoute);
app.use("/api/partners", partnerRoute);

// ================== Sector Routes ==========================
app.use("/api/gamestones", gamestoneRoute);
app.use("/api/resources", resourceRoute);
app.use("/api/snapshots", snapshotRoute);
app.use("/api/petroleum-objectives", petroleumObjectiveRoute);
app.use("/api/petroleum-processes", petroleumProcessRoute);
app.use("/api/petroleum-regulation-processes", petroleumRegulationRoute);
app.use("/api/mining-application-processes", miningApplicationProcessRoute);
app.use("/api/mining-regulation-processes", miningRegulationProcessRoute);

// ================== ASM Routes ==========================
app.use("/api/asm", asmRoute);

// ================== Investigate Ethiopia Routes ==========================
app.use("/api/investigate-ethiopia", investigateEthiopiaRoute);

// ================== Api Attachment Routes =====================
app.use("/api/attachments", attachmentRoute);

// ================== Event Routes =====================
app.use("/api/events", eventRoute);
app.use("/api/event-categories", eventCategoryRoute);

// ================== System Routes =====================
app.use("/api/audit-logs", auditLogRoute);
app.use("/api/dashboard-analytics", dashboardRoute);

// ================== Root Endpoint ==================
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Issue Tracking System API 🚀" });
});

// ================== Error Handler ==================
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================== Start App Server ==================
const appPort = process.env.PORT || 4000;
appServer.listen(appPort, () => {
  console.log(` App server running at http://localhost:${appPort}`);
});

// ================== Socket.IO Setup ==================
const socketServer = http.createServer();
const io = new Server(socketServer, {
  cors: corsOptions,
});

const onlineUsers = new Map();

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    onlineUsers.set(userId, socket.id);
    console.log(` User ${userId} connected: ${socket.id}`);
  }

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    console.log(`User ${userId} disconnected`);
  });
});

const socketPort = process.env.SOCKET_PORT || 5000;
socketServer.listen(socketPort, () => {
  console.log(`Socket.IO server running at http://localhost:${socketPort}`);
});

// Make Socket.IO accessible globally
app.set("socketio", io);

module.exports = { appServer, io, onlineUsers };
