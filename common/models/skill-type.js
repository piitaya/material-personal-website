var loopbackslug = require("loopback-slug");

module.exports = function(SkillType) {
  SkillType.observe('before save', function (ctx, next) {  //!!important 
    loopbackslug.middleware(SkillType, ctx, {
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
