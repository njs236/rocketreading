var Badge = function (newBadgeId, newBadgeIcon, newBadgeName, newBadgeDescription, newBadgeType) {
    this.badgeID = newBadgeId;
    this.badgeIcon = newBadgeIcon;
    this.badgeName = newBadgeName;
    this.badgeDescription = newBadgeDescription;
    this.badgeType = newBadgeType;
}

Badge.prototype.getId = function () {
	return this.badgeID;
};

Badge.prototype.getIcon = function () {
    return this.badgeIcon;
};
Badge.prototype.getName = function () {
    return this.badgeName;
};
Badge.prototype.getDescription = function () {
    return this.badgeDescription;
};

Badge.prototype.getType = function () {
    return this.badgeType;
}