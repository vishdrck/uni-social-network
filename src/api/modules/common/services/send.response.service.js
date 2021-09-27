"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SendResponseService {
    response(http_status, status, msg, data, res) {
        if (data) {
            res.status(http_status).json({
                STATUS: status,
                MESSAGE: msg,
                DATA: data
            });
        }
        else {
            res.status(http_status).json({
                STATUS: status,
                MESSAGE: msg,
                DATA: {}
            });
        }
    }
}
exports.default = new SendResponseService().response;
