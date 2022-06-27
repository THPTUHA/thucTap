export default class BaseError {

    static Code = {
        ERROR: -1,
        SUCCESS: 1,
    };

    message: string;
    code: number;
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }

    release() {
        return {
            message: this.message,
            code: this.code
        }
    }
}