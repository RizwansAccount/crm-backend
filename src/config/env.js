export const env = {
	port : process.env.PORT || 5000,
	nodeEnv: process.env.NODE_ENV || "development",
	mongodbUri: process.env.DB_URI || "mongodb://127.0.0.1:27017/crm",
	jwtSecret: process.env.JWT_SECRET || "my_crm_secret",
};