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
exports.WorkspaceMembers = void 0;
var typeorm_1 = require("typeorm");
var Workspaces_1 = require("./Workspaces");
var Users_1 = require("./Users");
var WorkspaceMembers = /** @class */ (function () {
    function WorkspaceMembers() {
    }
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], WorkspaceMembers.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], WorkspaceMembers.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)('int', { primary: true, name: 'WorkspaceId' }),
        __metadata("design:type", Number)
    ], WorkspaceMembers.prototype, "WorkspaceId");
    __decorate([
        (0, typeorm_1.Column)('int', { primary: true, name: 'UserId' }),
        __metadata("design:type", Number)
    ], WorkspaceMembers.prototype, "UserId");
    __decorate([
        (0, typeorm_1.Column)('datetime', { name: 'loggedInAt', nullable: true }),
        __metadata("design:type", Date)
    ], WorkspaceMembers.prototype, "loggedInAt");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Workspaces_1.Workspaces; }, function (workspaces) { return workspaces.WorkspaceMembers; }, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'WorkspaceId', referencedColumnName: 'id' }]),
        __metadata("design:type", Workspaces_1.Workspaces)
    ], WorkspaceMembers.prototype, "Workspace");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.WorkspaceMembers; }, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'UserId', referencedColumnName: 'id' }]),
        __metadata("design:type", Users_1.Users)
    ], WorkspaceMembers.prototype, "User");
    WorkspaceMembers = __decorate([
        (0, typeorm_1.Index)('UserId', ['UserId'], {}),
        (0, typeorm_1.Entity)('workspacemembers', { schema: 'slack' })
    ], WorkspaceMembers);
    return WorkspaceMembers;
}());
exports.WorkspaceMembers = WorkspaceMembers;
