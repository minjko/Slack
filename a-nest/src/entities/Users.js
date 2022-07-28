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
exports.Users = void 0;
var typeorm_1 = require("typeorm");
var ChannelChats_1 = require("./ChannelChats");
var ChannelMembers_1 = require("./ChannelMembers");
var Channels_1 = require("./Channels");
var DMs_1 = require("./DMs");
var Mentions_1 = require("./Mentions");
var WorkspaceMembers_1 = require("./WorkspaceMembers");
var Workspaces_1 = require("./Workspaces");
var swagger_1 = require("@nestjs/swagger");
var Users = /** @class */ (function () {
    function Users() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 1,
            description: '사용자 아이디'
        }),
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
        __metadata("design:type", Number)
    ], Users.prototype, "id");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'komj36@gmail.com',
            description: '이메일'
        }),
        (0, typeorm_1.Column)('varchar', { name: 'email', unique: true, length: 30 }),
        __metadata("design:type", String)
    ], Users.prototype, "email");
    __decorate([
        (0, swagger_1.ApiProperty)({
            example: 'Minjeong Ko',
            description: '닉네임'
        }),
        (0, typeorm_1.Column)('varchar', { name: 'nickname', length: 30 }),
        __metadata("design:type", String)
    ], Users.prototype, "nickname");
    __decorate([
        (0, typeorm_1.Column)('varchar', { name: 'password', length: 100, select: false }),
        __metadata("design:type", String)
    ], Users.prototype, "password");
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Users.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Users.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.DeleteDateColumn)(),
        __metadata("design:type", Date)
    ], Users.prototype, "deletedAt");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ChannelChats_1.ChannelChats; }, function (channelchats) { return channelchats.User; }),
        __metadata("design:type", Array)
    ], Users.prototype, "ChannelChats");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return ChannelMembers_1.ChannelMembers; }, function (channelmembers) { return channelmembers.User; }),
        __metadata("design:type", Array)
    ], Users.prototype, "ChannelMembers");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return DMs_1.DMs; }, function (dms) { return dms.Sender; }),
        __metadata("design:type", Array)
    ], Users.prototype, "DMs");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return DMs_1.DMs; }, function (dms) { return dms.Receiver; }),
        __metadata("design:type", Array)
    ], Users.prototype, "DMs2");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Mentions_1.Mentions; }, function (mentions) { return mentions.Sender; }),
        __metadata("design:type", Array)
    ], Users.prototype, "Mentions");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Mentions_1.Mentions; }, function (mentions) { return mentions.Receiver; }),
        __metadata("design:type", Array)
    ], Users.prototype, "Mentions2");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return WorkspaceMembers_1.WorkspaceMembers; }, function (workspacemembers) { return workspacemembers.User; }),
        __metadata("design:type", Array)
    ], Users.prototype, "WorkspaceMembers");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Workspaces_1.Workspaces; }, function (workspaces) { return workspaces.Owner; }),
        __metadata("design:type", Array)
    ], Users.prototype, "OwnedWorkspaces");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Workspaces_1.Workspaces; }, function (workspaces) { return workspaces.Members; }),
        (0, typeorm_1.JoinTable)({
            name: 'workspacemembers',
            joinColumn: {
                name: 'UserId',
                referencedColumnName: 'id'
            },
            inverseJoinColumn: {
                name: 'WorkspaceId',
                referencedColumnName: 'id'
            }
        }),
        __metadata("design:type", Array)
    ], Users.prototype, "Workspaces");
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Channels_1.Channels; }, function (channels) { return channels.Members; }),
        (0, typeorm_1.JoinTable)({
            name: 'channelmembers',
            joinColumn: {
                name: 'UserId',
                referencedColumnName: 'id'
            },
            inverseJoinColumn: {
                name: 'ChannelId',
                referencedColumnName: 'id'
            }
        }),
        __metadata("design:type", Array)
    ], Users.prototype, "Channels");
    Users = __decorate([
        (0, typeorm_1.Index)('email', ['email'], { unique: true }),
        (0, typeorm_1.Entity)({ schema: 'slack', name: 'users' })
    ], Users);
    return Users;
}());
exports.Users = Users;
