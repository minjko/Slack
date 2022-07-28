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
exports.ChannelMembers = void 0;
var typeorm_1 = require("typeorm");
var Channels_1 = require("./Channels");
var Users_1 = require("./Users");
var ChannelMembers = /** @class */ (function () {
    function ChannelMembers() {
    }
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], ChannelMembers.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], ChannelMembers.prototype, "updatedAt");
    __decorate([
        (0, typeorm_1.Column)('int', { primary: true, name: 'ChannelId' }),
        __metadata("design:type", Number)
    ], ChannelMembers.prototype, "ChannelId");
    __decorate([
        (0, typeorm_1.Column)('int', { primary: true, name: 'UserId' }),
        __metadata("design:type", Number)
    ], ChannelMembers.prototype, "UserId");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Channels_1.Channels; }, function (channels) { return channels.ChannelMembers; }, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'ChannelId', referencedColumnName: 'id' }]),
        __metadata("design:type", Channels_1.Channels)
    ], ChannelMembers.prototype, "Channel");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Users_1.Users; }, function (users) { return users.ChannelMembers; }, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }),
        (0, typeorm_1.JoinColumn)([{ name: 'UserId', referencedColumnName: 'id' }]),
        __metadata("design:type", Users_1.Users)
    ], ChannelMembers.prototype, "User");
    ChannelMembers = __decorate([
        (0, typeorm_1.Index)('UserId', ['UserId'], {}),
        (0, typeorm_1.Entity)({ schema: 'slack', name: 'channelmembers' })
    ], ChannelMembers);
    return ChannelMembers;
}());
exports.ChannelMembers = ChannelMembers;
