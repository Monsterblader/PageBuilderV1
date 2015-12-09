describe("Calendar", function() {
  beforeEach(function() {
    $=jQuery;
    jasmine.getFixtures().fixturesPath = "base/html";
    jasmine.getFixtures().load('contact.html');
  });

  describe("The functions.", function () {
    describe("createContact", function() {
      it("should exist.", function() {
        expect(typeof createContact).toBe("function");
      });
    });
  });

  describe("createContact", function() {
    it("should render the header", function() {
      var scope;
      scope = {
        customer_care: {
          display: "url",
          url: "http://www.narvar.com",
          telephone: "(213) 456-7890"
        },
      };
      createContact(scope);
      expect($(".contact-header").text()).toBe("Contact Us");
    });

    it("should render a url", function() {
      var scope;
      scope = {
        customer_care: {
          display: "url",
          url: "http://www.narvar.com",
          telephone: "(213) 456-7890"
        },
      };
      createContact(scope);
      expect($(".contact-text").text()).toBe("Contact Us");
      expect($(".contact-text").attr("href")).toBe("http://www.narvar.com");
    });

    it("should render a phone number", function() {
      var scope;
      scope = {
        customer_care: {
          display: "telephone",
          url: "http://www.narvar.com",
          telephone: "(213) 456-7890"
        },
      };
      createContact(scope);
      expect($(".contact-text").text()).toBe("Call us at: (213) 456-7890");
    });
  });
});
