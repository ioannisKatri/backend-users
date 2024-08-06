/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorDetail:
 *       type: object
 *       properties:
 *         field:
 *           type: string
 *         value:
 *           type: string
 *         location:
 *           type: string
 *         issue:
 *           type: string
 *         description:
 *           type: string
 *     BadRequestErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [validation_failed, not_found, error]
 *         message:
 *           type: string
 *         details:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ErrorDetail'
 *           description: Optional array of error details
 *           nullable: true
 *         timestamp:
 *           type: string
 *           format: date-time
 *     InternalServerErrorResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [error]
 *         message:
 *           type: string
 *         timestamp:
 *           type: string
 *           format: date-time
 */
