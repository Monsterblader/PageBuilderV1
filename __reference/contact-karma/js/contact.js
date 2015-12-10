var createContact;

createContact = function(scope) {
  $(".contact-header").text(lg.contactHeader);
  if ("url" === scope.customer_care.display) {
    $(".contact-text").text(lg.contactText);
    $(".contact-text").attr("href", scope.customer_care.url);
  } else {
    $(".contact-text").text(lg.contactPhone + scope.customer_care.telephone);
  }
};
