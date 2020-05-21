import "./utils/dotenv";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import passport from "passport";
import { authenticateJwt } from "./passport";
import { prisma } from "../generated/prisma-client";

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request }),
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`Server is running on localhost:${PORT}`)
);
