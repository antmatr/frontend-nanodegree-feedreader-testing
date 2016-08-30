/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object
         * and ensures it has a URL defined and not empty.
         */
        it('URLs are defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });


        /* This test loops through each feed in the allFeeds object
         * and ensures it has a name defined and not empty.
         */
        it('names are defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function () {
        // This test ensures the menu element is hidden by default.
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* This test ensures the menu changes visibility
         * when the menu icon is clicked.
         */
        it('changes visibility when the menu icon is clicked', function () {
            var menuIcon = $('.menu-icon-link');
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function () {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        it('have at least a single .entry', function () {
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    describe('New Feed Selection', function () {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        var result1;
        var result2;
        beforeEach(function (done) {
            loadFeed(0, function () {
                result1 = $('.feed .entry').html();
                loadFeed(1, function () {
                    result2 = $('.feed .entry').html();
                    done();
                });
            });
        });

        it('contents another feeds', function (done) {
            expect(result1).not.toBe(result2);
            done();
        });
    });

}());
