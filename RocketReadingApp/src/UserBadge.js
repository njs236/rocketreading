var UserBadge = function (newBadgeId, newDate) {
    this.badgeId = newBadgeId;
    this.date = newDate;
}

UserBadge.prototype.getId = function () {
    return this.badgeId;
}