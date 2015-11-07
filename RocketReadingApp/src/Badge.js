var Badge = function (newBadgeId, newBadgeIcon, newBadgeName, newBadgeDescription, newBadgeSuggestion, newBadgeType) {
    this.badgeID = newBadgeId;
    this.badgeIcon = newBadgeIcon;
    this.badgeName = newBadgeName;
    this.badgeDescription = newBadgeDescription;
	this.badgeSuggestion = newBadgeSuggestion;
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
};

Badge.prototype.getSuggestion = function () {
	return this.badgeSuggestion;
}