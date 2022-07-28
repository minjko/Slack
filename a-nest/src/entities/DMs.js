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
exports.DMs = void 0;
var typeorm_1 = require("typeorm");
var Workspaces_1 = require("./Workspaces");
var Users_1 = require("./Users");
var DMs = /** @class */ (function () {
    function DMs() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
        __metadata("design:type", Number)
    ], DMs.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)('text', { name: 'content' }),
        __metadata("design:type", String)
    ], DMs.prototype, "content");
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], DMs.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], DMs.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'WorkspaceId', nullable: true }),
        __metadata("design:type", Number)
    ], DMs.prototype, "WorkspaceId");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'SenderId', nullable: true }),
        __metadata("design:type", Number)
    ], DMs.prototype, "SenderId");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'ReceiverId', nullable: true }),
        __metadata("design:type", Number)
    ], DMs.prototype, "ReceiverId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Workspaces_1.Workspaces; }, function (workspaces) { return workspaces.DMs; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'WorkspaceId', referencedColumnName: 'id' }]),
        __metadata("design:type", Workspaces_1.Workspaces)
    ], DMs.prototype, "Workspace");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.DMs; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'SenderId', referencedColumnName: 'id' }]),
        __metadata("design:type", Users_1.Users)
    ], DMs.prototype, "Sender");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.DMs2; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'ReceiverId', referencedColumnName: 'id' }]),
        __metadata("design:type", Users_1.Users)
    ], DMs.prototype, "Receiver");
    DMs = __decorate([
        (0, typeorm_1.Index)('WorkspaceId', ['WorkspaceId'], {}),
        (0, typeorm_1.Index)('dms_ibfk_2', ['SenderId'], {}),
        (0, typeorm_1.Index)('dms_ibfk_3', ['ReceiverId'], {}),
        (0, typeorm_1.Entity)({ schema: 'slack', name: 'dms' })
    ], DMs);
    return DMs;
}());
exports.DMs = DMs;
