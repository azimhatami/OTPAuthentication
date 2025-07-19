/**
 * @swagger 
 * tags:
 *   name: Authentication
 *   description: User authentication with OTP
 * 
 * paths:
 *   /api/auth/send-otp:
 *     post:
 *       summary: Request an OTP for a given mobile number
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mobile:
 *                   type: string
 *                   example: "09123456789"
 *       responses:
 *         "201":
 *           description: OTP sent successfully
 * 
 *   /api/auth/verify-otp:
 *     post:
 *       summary: Verify OTP and log in or register the user
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mobile:
 *                   type: string
 *                   example: "09123456789"
 *                 code:
 *                   type: string
 *                   example: "123456"
 *       responses:
 *         "200":
 *           description: Login successful, returns JWT token
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *         "400":
 *           description: Invalid or expired OTP
 */
