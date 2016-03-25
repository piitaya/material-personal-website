var loopbackslug = require("loopback-slug");

module.exports = function(ExperienceType) {
  ExperienceType.observe('before save', function (ctx, next) {  //!!important 
    loopbackslug.middleware(ExperienceType, ctx, {
      fields: ['name'],
      slug: "slug",
      lowercase: true,
      separator: "-"
    }, function (err) {
      if (err) return next(err);
      else next(null);
    });
  });
};