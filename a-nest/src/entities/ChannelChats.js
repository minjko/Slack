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
exports.ChannelChats = void 0;
var typeorm_1 = require("typeorm");
var Users_1 = require("./Users");
var Channels_1 = require("./Channels");
// @Index의 경우 SQL 성능 높이기 위해 사용. 없어도 무관.
var ChannelChats = /** @class */ (function () {
    function ChannelChats() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
        __metadata("design:type", Number)
    ], ChannelChats.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)('text', { name: 'content' }),
        __metadata("design:type", String)
    ], ChannelChats.prototype, "content");
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], ChannelChats.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], ChannelChats.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'UserId', nullable: true }),
        __metadata("design:type", Number)
    ], ChannelChats.prototype, "UserId");
    __decorate([
        (0, typeorm_1.Column)('int', { name: 'ChannelId', nullable: true }),
        __metadata("design:type", Number)
    ], ChannelChats.prototype, "ChannelId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.ChannelChats; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'UserId', referencedColumnName: 'id' }]),
        __metadata("design:type", Users_1.Users)
    ], ChannelChats.prototype, "User");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Channels_1.Channels; }, function (channels) { return channels.ChannelChats; }, {
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'ChannelId', referencedColumnName: 'id' }]),
        __metadata("design:type", Channels_1.Channels)
    ], ChannelChats.prototype, "Channel");
    ChannelChats = __decorate([
        (0, typeorm_1.Index)('UserId', ['UserId'], {}),
        (0, typeorm_1.Index)('ChannelId', ['ChannelId'], {}),
        (0, typeorm_1.Entity)({ schema: 'slack', name: 'channelchats' })
    ], ChannelChats);
    return ChannelChats;
}());
exports.ChannelChats = ChannelChats;
