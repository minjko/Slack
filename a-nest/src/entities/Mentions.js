"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.Mentions = void 0;
var typeorm_1 = require("typeorm");
var Workspaces_1 = require("./Workspaces");
var Users_1 = require("./Users");
var Mentions = /** @class */ (function () {
    function Mentions() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
        __metadata("design:type", Number)
    ], Mentions.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)('enum', { name: 'category', "enum": ['chat', 'dm', 'system'] }),
        __metadata("design:type", String)
    ], Mentions.prototype, "type");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'ChatId', nullable: true }),
        __metadata("design:type", Number)
    ], Mentions.prototype, "ChatId");
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Mentions.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Mentions.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'WorkspaceId', nullable: true }),
        __metadata("design:type", Number)
    ], Mentions.prototype, "WorkspaceId");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'SenderId', nullable: true }),
        __metadata("design:type", Number)
    ], Mentions.prototype, "SenderId");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'ReceiverId', nullable: true }),
        __metadata("design:type", Number)
    ], Mentions.prototype, "ReceiverId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Workspaces_1.Workspaces; }, function (workspaces) { return workspaces.Mentions; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'WorkspaceId', referencedColumnName: 'id' }]),
        __metadata("design:type", Workspaces_1.Workspaces)
    ], Mentions.prototype, "Workspace");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.Mentions; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'SenderId', referencedColumnName: 'id' }]),
        __metadata("design:type", Users_1.Users)
    ], Mentions.prototype, "Sender");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.Mentions2; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'ReceiverId', referencedColumnName: 'id' }]),
        __metadata("design:type", Users_1.Users)
    ], Mentions.prototype, "Receiver");
    Mentions = __decorate([
        (0, typeorm_1.Index)('WorkspaceId', ['WorkspaceId'], {}),
        (0, typeorm_1.Index)('SenderId', ['SenderId'], {}),
        (0, typeorm_1.Index)('ReceiverId', ['ReceiverId'], {}),
        (0, typeorm_1.Entity)({ schema: 'slack', name: 'mentions' })
    ], Mentions);
    return Mentions;
}());
exports.Mentions = Mentions;
