"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_codes_type_1 = require("../types/http-codes.type");
class InternalErrorResponseService {
    response(err, res) {
        res.status(http_codes_type_1.HTTPCODES.ERR_INTERNAL_SERVER_ERROR).json({
            STATUS: 'failure',
            MESSAGE: 'Internal server error: IAM_ERROR',
            DATA: err
        });
    }
}
exports.default = new InternalErrorResponseService().response;
