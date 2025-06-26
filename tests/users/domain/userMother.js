"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMother = void 0;
const user_1 = require("@core/users/domain/user");
const uuid_1 = require("uuid");
class UserMother {
    static dto(user) {
        return {
            id: (0, uuid_1.v4)(),
            name: user.name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            phone: user.phone,
            general_role_id: user.general_role_id,
            created_at: user.created_at,
        };
    }
    static createUser(repository, overrides) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = user_1.User.create(overrides);
        });
    }
}
exports.UserMother = UserMother;
