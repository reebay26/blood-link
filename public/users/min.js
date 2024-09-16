"use strict";
function _objectSpread(t) {
    for (var e = 1; e < arguments.length; e++) {
        var n = null != arguments[e] ? arguments[e] : {},
            o = Object.keys(n);
        "function" == typeof Object.getOwnPropertySymbols &&
            (o = o.concat(
                Object.getOwnPropertySymbols(n).filter(function (e) {
                    return Object.getOwnPropertyDescriptor(n, e).enumerable;
                })
            )),
            o.forEach(function (e) {
                _defineProperty(t, e, n[e]);
            });
    }
    return t;
}
function _defineProperty(e, t, n) {
    return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : (e[t] = n), e;
}
function _typeof(e) {
    return (_typeof =
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
            ? function (e) {
                  return typeof e;
              }
            : function (e) {
                  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
              })(e);
}
angular.module("website.content_sections", []),
    angular.module("website.core.analytics.google", ["website.core.analytics"]).provider("MotoGoogleAnalyticsService", [
        "MotoWebsiteAnalyticsProvider",
        function (e) {
            var t = e.getAbstractTrackingService();
            return (
                (this.$get = [
                    "$q",
                    function (a) {
                        function e() {
                            t.apply(this, arguments);
                        }
                        return (
                            (((e.prototype = Object.create(t.prototype)).constructor = e).prototype.getName = function () {
                                return "GoogleAnalytics";
                            }),
                            (e.prototype.fireEvent = function (e, t, n) {
                                var o = a.defer(),
                                    i = window.ga,
                                    r = {};
                                return (
                                    !!i &&
                                    !(!angular.isString(e) || e.length < 1) &&
                                    !!angular.isObject(t) &&
                                    !(angular.isUndefined(t.category) || !angular.isString(t.category) || t.category.length < 1) &&
                                    ((r.eventCategory = t.category),
                                    (r.eventAction = e),
                                    angular.isString(t.action) && 1 < t.action.length && (r.eventAction = t.action),
                                    angular.isString(t.label) && 0 < t.label.length && (r.eventLabel = t.label),
                                    angular.isNumber(t.value) && (r.eventValue = t.value),
                                    n && (r.transport = "beacon"),
                                    (r.hitCallback = function () {
                                        o.resolve(!0);
                                    }),
                                    i("send", "event", r),
                                    o.promise)
                                );
                            }),
                            new e()
                        );
                    },
                ]),
                this
            );
        },
    ]),
    angular.module("website.core.analytics", ["ng"]).provider("MotoWebsiteAnalytics", [
        function () {
            var d = this,
                n = { maxTimeout: 1500 },
                s = [];
            function l() {}
            return (
                ((l.prototype = {}).getName = function () {
                    return console.warn('Method "getName" not implemented', this), "";
                }),
                (l.prototype.fireEvent = function () {
                    return console.warn('Method "fireEvent" not implemented', this), null;
                }),
                (d.getAbstractTrackingService = function () {
                    return l;
                }),
                (d.registerTrackingService = function (e) {
                    return !(-1 < s.indexOf(e)) && (s.push(e), !0);
                }),
                (d.setOption = function (e, t) {
                    return !!angular.isString(e) && ((n[e] = t), !0);
                }),
                (d.getOption = function (e, t) {
                    return angular.isUndefined(n[e]) ? t || null : n[e];
                }),
                (d.$get = [
                    "$injector",
                    "$q",
                    "$timeout",
                    function (e, c, u) {
                        var t,
                            n,
                            o,
                            i,
                            r = null;
                        function a() {
                            this._services = {};
                        }
                        for (
                            (a.prototype = {})._services = {},
                                a.prototype.addTrackingService = function (e, t) {
                                    return r instanceof l
                                        ? (angular.isString(t) || (t = e.getName()),
                                          angular.isString(t)
                                              ? (t = t.trim()).length < 1
                                                  ? (console.warn("Tracking service name is empty"), !1)
                                                  : this.hasService(t)
                                                  ? (console.warn('Tracking service "' + t + '" already registered'), !1)
                                                  : ((this._services[t] = e), !0)
                                              : (console.warn("Tracking service name must be a string"), !1))
                                        : (console.warn("Tracking service must be instance of AbstractTrackingServiceClass"), console.log("Service : ", e), console.log("Name : ", t), !1);
                                },
                                a.prototype.getService = function (e) {
                                    return this._services[e] || null;
                                },
                                a.prototype.hasService = function (e) {
                                    return angular.isDefined(this._services[e]);
                                },
                                a.prototype.fireEvent = function (e, t, n) {
                                    var o,
                                        i,
                                        r = c.defer(),
                                        a = {},
                                        s = !1;
                                    new Date();
                                    for (i in (angular.isObject(e) && ((n = t), (e = (t = e).action)), this._services))
                                        if (this._services.hasOwnProperty(i))
                                            try {
                                                a[i] = this._services[i].fireEvent(e, angular.copy(t), n);
                                            } catch (e) {
                                                console.warn("Cant fire event by service", i), console.error(e);
                                            }
                                    function l(e) {
                                        o && u.cancel(o), s || ((s = !0), r.resolve(!0));
                                    }
                                    return (
                                        c.all(a).then(l, function () {
                                            s || ((s = !0), r.reject(!1));
                                        }),
                                        (o = u(function () {
                                            l();
                                        }, d.getOption("maxTimeout", 1e3))),
                                        r.promise
                                    );
                                },
                                t = new a(),
                                n = 0,
                                o = s.length;
                            n < o;
                            n++
                        ) {
                            (r = null), (i = s[n]);
                            try {
                                angular.isString(i)
                                    ? e.has(i)
                                        ? ((r = e.get(i)), angular.isFunction(r) && (r = new r()))
                                        : console.warn('Service or Factory "', i, '" not found')
                                    : angular.isArray(i)
                                    ? (r = e.invoke(i))
                                    : angular.isFunction(i)
                                    ? (r = new i())
                                    : angular.isObject(i) && (r = i);
                            } catch (e) {
                                console.warn("Cant register tracking service by", i), console.error(e);
                                continue;
                            }
                            t.addTrackingService(r);
                        }
                        return t;
                    },
                ]),
                d
            );
        },
    ]),
    angular.module("website.core.animation", []),
    angular.module("website.core.entertainment", ["website.core.animation"]),
    angular.module("website.core.form", ["ng"]),
    angular.module("website.core.humanize_duration", []),
    angular.module("website.core.settings", ["ng"]),
    angular.module("website.core.dependency", [
        "website.core.settings",
        "website.core.utils",
        "website.LiveChat",
        "website.core.animation",
        "website.core.entertainment",
        "website.core.media",
        "website.core.widgets",
        "website.core.analytics",
    ]),
    angular.module("website.core.media", []),
    angular.module("website.core.utils", []).provider("MotoUtils", [
        function () {
            var e = this;
            return (
                (e.getValue = function (e, t, n) {
                    var o, i, r, a;
                    if (angular.isNumber(t)) {
                        if (isNaN(t)) return n;
                        t += "";
                    }
                    if (!angular.isString(t) || t.length < 1) return n;
                    if (angular.isDefined(e[t])) return e[t];
                    a = t.split(".");
                    try {
                        for (i = e, o = 0, r = a.length; o < r; o++) angular.isDefined(i) && (i = i[a[o]]);
                        if (angular.isDefined(i)) return i;
                    } catch (e) {}
                    return n;
                }),
                (e.$get = function () {
                    return e;
                }),
                e
            );
        },
    ]),
    angular.module("website.core.widgets", ["website.core.animation", "website.core.entertainment"]),
    angular
        .module("website", [
            "core.library.config",
            "core.library.jsonrpc",
            "website.core",
            "website.widgets",
            "website.plugins",
            "website.moto_link",
            "website.content_sections",
            "moto.validation",
            "common.elements.Paginator",
            "ngStorage",
            "ipCookie",
        ])
        .config([
            "$compileProvider",
            "$httpProvider",
            "$localStorageProvider",
            function (e, t, n) {
                e.debugInfoEnabled(!1),
                    t.useApplyAsync(!0),
                    n.setDeserializer(function (e) {
                        try {
                            return angular.isString(e) && e.length && ("{" === e[0] || "[" === e[0]) ? angular.fromJson(e) : e;
                        } catch (e) {
                            return null;
                        }
                    }),
                    n.setKeyPrefix("mf_");
            },
        ])
        .value("currentFrontendSession", {})
        .run([
            "jsonrpc",
            "website.MotoStorageService",
            "website.MotoPopupService",
            "currentFrontendSession",
            "MotoScrollbarWatcherService",
            function (e, t, n, o, i) {
                window.websiteConfig && window.websiteConfig.apiUrl ? e.setBasePath(websiteConfig.apiUrl) : e.setBasePath("/api.php");
            
                if (!localStorage.getItem("session-started")) {
                    localStorage.setItem("session-started", Date.now());
                    o.isNew = true;
                }
            
                n.init();
            
                i.addWatcher(function () {
                    var e = window.document.createEvent("UIEvents");
                    e.initUIEvent("resize", true, false, window, 0);
                    window.dispatchEvent(e);
                }, angular.element("html")[0]);
            }
            
        ]),
    angular.module("website.widgets", [
        "website.widget.content_sections",
        "website.widgets.templates",
        "website.widget.contact_form",
        "website.widget.mail_chimp",
        "website.widget.auth_form",
        "website.widget.slider",
        "website.widget.grid_gallery",
        "website.widget.carousel",
        "website.widget.disqus",
        "website.widget.facebook_page_plugin",
        "website.widget.twitter",
        "website.widget.pinterest",
        "website.widget.menu",
        "website.widget.audio_player",
        "website.widget.video_player",
        "website.widget.social_buttons",
        "website.widget.countdown",
        "website.widget.counter",
        "website.widget.completion_bar_circular",
        "website.widget.accordion",
        "website.widget.tabs",
        "website.widget.actions",
        "website.widget.instagram.post",
        "website.widget.google_map_pro",
        "website.widget.google_recaptcha",
        "website.widget.integrations",
        "website.widget.MotoCallback",
        "website.widget.content_slider",
        "website.widget.google_search",
        "website.widget.advanced_image",
        "website.widget.tile_gallery",
        "website.widget.content_sections",
    ]);
try {
    angular.module("website.plugins");
} catch (e) {
    angular.module("website.plugins", []);
}
try {
    angular.module("website.widgets.templates");
} catch (e) {
    angular.module("website.widgets.templates", []);
}
angular.module("website.core", ["website.core.settings", "website.core.dependency", "website.core.analytics.google", "website.core.form", "website.core.humanize_duration"]),
    angular.module("website.core").config([
        "motoWebsiteSettingsServiceProvider",
        "MotoWebsiteAnalyticsProvider",
        function (e, t) {
            window.websiteConfig && angular.isObject(window.websiteConfig) && e.set(window.websiteConfig), t.registerTrackingService("MotoGoogleAnalyticsService"), t.registerTrackingService("MotoGoogleUniversalAnalyticsService");
        },
    ]),
    $("body").hasClass("moto-preview") ||
        $(document).ready(function () {
            function e() {
                return 1040 <= (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
            }
            function t() {
                $(window).stellar({ horizontalScrolling: !1, verticalScrolling: !0, responsive: !0 });
            }
            function n() {
                if (!e()) return $(window).stellar("destroy"), void $(".moto-parallax").css("background-position", "");
                -1 === window.navigator.userAgent.indexOf("Trident/") && -1 === window.navigator.userAgent.indexOf("Edge/") && $(window).stellar("destroy"), t();
            }
            var o, i;
            e() && t(),
                (i = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i)),
                (o = navigator.userAgent.match(/Edge/i) || navigator.userAgent.match(/Trident.*rv[ :]*11\./i) ? "msie" : i[1].toLowerCase()),
                window.document.body.classList.add("moto-browser_" + o),
                $(document).on("lazybeforeunveil", ".lazyload", function (e) {
                    $(e.target).one("load", n);
                }),
                $(window).on("resize", n);
        }),
    angular.module("website.LiveChat", ["website.core.utils", "website.LiveChat.settings"]),
    angular.module("website.moto_link", ["website.backend.RenderService"]),
    angular.module("moto.validation", []),
    angular.module("website.backend.RenderService", ["core.library.jsonrpc"]),
    angular.module("website").directive("motoBackToTopButton", [
        "$window",
        function (r) {
            var a = (window.websiteConfig && window.websiteConfig.back_to_top_button) || {};
            return (
                (a.enabled = "none" !== a.type),
                (a.topOffset = parseInt(a.topOffset) || 300),
                (a.animationTime = parseInt(a.animationTime) || 500),
                (a.cssVisibleClass = "moto-back-to-top-button_visible"),
                (a.cssAnimationClass = "animated"),
                {
                    restrict: "EA",
                    link: function (e, t) {
                        var n = angular.element(r),
                            o = null,
                            i = null;
                        (e.toTop = function () {
                            try {
                                $("body,html").animate({ scrollTop: 0 }, a.animationTime);
                            } catch (e) {}
                        }),
                            a.enabled &&
                                n.scroll(function () {
                                    t.removeAttr("style");
                                    try {
                                        (i = n.scrollTop() > a.topOffset) !== o && ((o = i) ? t.addClass(a.cssVisibleClass) : t.removeClass(a.cssVisibleClass), t.addClass(a.cssAnimationClass));
                                    } catch (e) {}
                                });
                    },
                }
            );
        },
    ]),
    angular.module("website").directive("motoBeforeInViewport", [
        "motoBeforeInViewport",
        "website.Entertainment",
        function (a, s) {
            return {
                restrict: "C",
                link: function (e, t, n) {
                    var o = 0 < t.closest(".moto-widget_interactive").length,
                        i = {},
                        r = { $scope: e, $element: t };
                    (i.element = t),
                        (i.$scope = e),
                        (i.onEnter = n.motoBeforeInViewportOnEnter),
                        (i.onLeave = n.motoBeforeInViewportOnLeave),
                        (i.visibilityMode = n.motoBeforeInViewportMode),
                        (i.watchAlways = !!angular.isDefined(n.motoBeforeInViewportWatchAlways) && n.motoBeforeInViewportWatchAlways),
                        o
                            ? (s.$onLetsDanceEvent(r, function () {
                                  s.isEnabledPlaying(t) && a.startWatching(i);
                              }),
                              s.$onLetsStopEvent(r, function () {
                                  a.stopWatching(i), t.removeClass("moto-after-in-viewport").addClass("moto-before-in-viewport");
                              }))
                            : a.startWatching(i);
                },
            };
        },
    ]),
    angular.module("website").service("motoBeforeInViewport", [
        function () {
            var n = [],
                r = $(window),
                a = !1,
                e = !1,
                t = !1,
                o = 100,
                s = "moto-before-in-viewport_content-invisible",
                l = "moto-widget__state_loading";
            function i(e) {
                var t = r.scrollTop(),
                    n = t + r.height(),
                    o = e.element.offset().top,
                    i = o + e.element.outerHeight();
                return (
                    !(0 < e.element.closest("." + s + ", ." + l).length) &&
                    !!e.element.filter(":visible").length &&
                    ("part" === e.visibilityMode ? !(i < t || n < o) : "full" === e.visibilityMode ? t <= o && i <= n : (a && console.error("motoBeforeInViewport : unexpected visibilityMode", e.visibilityMode), !0))
                );
            }
            function c(e) {
                return (
                    a && console.log("motoBeforeInViewport: item get in viewport", e),
                    e.element.removeClass("moto-before-in-viewport"),
                    e.element.addClass("moto-after-in-viewport"),
                    angular.isString(e.onEnter) ? e.$scope.$eval(e.onEnter) : angular.isFunction(e.onEnter) && e.onEnter(),
                    e.watchAlways ? !(e.wasInViewport = !0) : (d(e), !0)
                );
            }
            function u() {
                e
                    ? (t = !0)
                    : (!(function () {
                          var e;
                          for (e = 0; e < n.length; e++) i(n[e]) ? n[e].wasInViewport || (c(n[e]) && e--) : n[e].wasInViewport && m(n[e]);
                      })(),
                      (t = !(e = !0)),
                      setTimeout(function () {
                          (e = !1), t && u();
                      }, o));
            }
            function d(e) {
                var t = n.indexOf(e);
                -1 !== t &&
                    (n.splice(t, 1), a && console.log("motoBeforeInViewport: removed", n), 0 === n.length && (a && console.info("motoBeforeInViewport: last element removed, unbind scroll handler"), r.off("resize", u).off("scroll", u)));
            }
            function m(e) {
                a && console.log("motoBeforeInViewport: item leave frome viewport", e),
                    e.element.removeClass("moto-after-in-viewport"),
                    e.element.addClass("moto-before-in-viewport"),
                    (e.wasInViewport = !1),
                    angular.isString(e.onLeave) ? e.$scope.$eval(e.onLeave) : angular.isFunction(e.onLeave) && e.onLeave();
            }
            (this.startWatching = function (e) {
                angular.isObject(e.element) &&
                    ((e.visibilityMode = e.visibilityMode || "part"),
                    (e.watchAlways = e.watchAlways || !1),
                    (e.wasInViewport = i(e)),
                    (e.wasInViewport && (c(e), !e.watchAlways)) ||
                        (n.push(e), a && console.log("motoBeforeInViewport: added", n), 1 === n.length && (a && console.info("motoBeforeInViewport: first element added, bind scroll handler"), r.on("resize", u).on("scroll", u))));
            }),
                (this.stopWatching = d),
                (this.elementIsVisible = function (e) {
                    e.removeClass(s), u();
                }),
                (this.elementIsInvisible = function (e) {
                    e.addClass(s), u();
                });
        },
    ]),
    angular.module("website").service("website.BrowserTabClosingConfirmation", [
        function () {
            var n = [];
            function o() {
                return "";
            }
            (this.enable = function (e) {
                angular.isString(e) && (n.push(e), 1 === n.length && angular.element(window).on("beforeunload", o));
            }),
                (this.disable = function (e) {
                    if (angular.isString(e)) {
                        var t = n.indexOf(e);
                        -1 !== t && (n.splice(t, 1), 0 === n.length && angular.element(window).off("beforeunload", o));
                    }
                });
        },
    ]),
    angular.module("website.content_sections").service("contentSectionsFiltersService", [
        "$rootScope",
        function (t) {
            var n,
                o = "contentSectionsFiltersService:changed",
                i = null;
            (this.getSelectedTaxonomiesAsArray = function (e) {
                var t = [];
                if ((e = e || i).filters && e.filters.taxonomies) for (var n in e.filters.taxonomies) e.filters.taxonomies[n] && t.push(parseInt(n, 10));
                return t;
            }),
                (this.getIsolatedModel = function () {
                    return { search: "", filters: { taxonomies: {} } };
                }),
                (this.getLinkedModel = function () {
                    return i || (i = this.fromQueryParams());
                }),
                (this.triggerChangeEvent = function () {
                    n && n.$broadcast(o);
                }),
                (this.onChange = function (e) {
                    return (
                        n || (n = t.$new(!0)),
                        n.$on(
                            o,
                            function () {
                                e(this);
                            }.bind(this)
                        )
                    );
                }),
                (this.cleanUpParams = function (e, t) {
                    var n = !0,
                        o = !1,
                        i = void 0;
                    try {
                        for (var r, a = t[Symbol.iterator](); !(n = (r = a.next()).done); n = !0) {
                            var s = r.value;
                            e.delete(s);
                        }
                    } catch (e) {
                        (o = !0), (i = e);
                    } finally {
                        try {
                            n || null == a.return || a.return();
                        } finally {
                            if (o) throw i;
                        }
                    }
                    return e;
                }),
                (this.fromQueryParams = function () {
                    var e,
                        t = new URLSearchParams(location.search),
                        n = this.getIsolatedModel(),
                        o = [];
                    if (((n.search = t.get("search") || ""), t.has("filters"))) {
                        e = t.get("filters");
                        try {
                            -1 === e.indexOf("{") && -1 === e.indexOf("[") && (e = atob(e)), (o = JSON.parse(e).taxonomies);
                        } catch (e) {}
                    } else t.has("taxonomies[]") && (o = t.getAll("taxonomies[]"));
                    return (
                        angular.isArray(o) &&
                            o.forEach(function (e) {
                                n.filters.taxonomies[e] = !0;
                            }),
                        n
                    );
                }),
                (this.toQueryParams = function (e) {
                    var t = new URLSearchParams(location.search);
                    if (((e = e || i).search && t.set("search", e.search), t.delete("page"), t.delete("taxonomies[]"), e.filters && e.filters.taxonomies))
                        for (var n in e.filters.taxonomies) e.filters.taxonomies[n] && t.append("taxonomies[]", n);
                    return t;
                }),
                (this.toUrlWithoutFiltersAndSearchParams = function () {
                    var e = new URLSearchParams(location.search);
                    return (e = this.cleanUpParams(e, ["search", "taxonomies[]", "page"]));
                }),
                (this.toUrlWithoutFilterParams = function (e) {
                    var t = new URLSearchParams(location.search);
                    return e.search && t.set("search", e.search), (t = this.cleanUpParams(t, ["taxonomies[]", "page"]));
                }),
                (this.toQueryParamsAsJson = function (e) {
                    var t,
                        n,
                        o = new URLSearchParams();
                    return (e = e || i).search && o.append("search", e.search), (t = this.getSelectedTaxonomiesAsArray(e)).length && ((n = { taxonomies: t }), o.append("filters", JSON.stringify(n))), o;
                }),
                (this.toQueryParamsAsBase64 = function (e) {
                    var t,
                        n,
                        o = new URLSearchParams();
                    return (e = e || i).search && o.append("search", e.search), (t = this.getSelectedTaxonomiesAsArray(e)).length && ((n = { taxonomies: t }), o.append("filters", btoa(JSON.stringify(n)))), o;
                });
        },
    ]),
    angular.module("website.core.analytics.google").provider("MotoGoogleUniversalAnalyticsService", [
        "MotoWebsiteAnalyticsProvider",
        function (e) {
            var t = e.getAbstractTrackingService();
            return (
                (this.$get = [
                    "$q",
                    function (s) {
                        function e() {
                            t.apply(this, arguments);
                        }
                        return (
                            (((e.prototype = Object.create(t.prototype)).constructor = e).prototype.getName = function () {
                                return "GoogleUniversalAnalytics";
                            }),
                            (e.prototype.fireEvent = function (e, t, n) {
                                var o = s.defer(),
                                    i = window.gtag,
                                    r = {},
                                    a = null;
                                return (
                                    !!i &&
                                    !(!angular.isString(e) || e.length < 1) &&
                                    !!angular.isObject(t) &&
                                    !(angular.isUndefined(t.category) || !angular.isString(t.category) || t.category.length < 1) &&
                                    ((r.event_category = t.category),
                                    (a = e),
                                    angular.isString(t.action) && 1 < t.action.length && (a = t.action),
                                    angular.isString(t.label) && 0 < t.label.length && (r.event_label = t.label),
                                    angular.isNumber(t.value) && (r.value = t.value),
                                    (r.event_callback = function () {
                                        o.resolve(!0);
                                    }),
                                    i("event", a, r),
                                    o.promise)
                                );
                            }),
                            new e()
                        );
                    },
                ]),
                this
            );
        },
    ]),
    angular.module("website.core.animation").provider("website.MotoAnimation", [
        function () {
            var e,
                n = !1,
                t = null,
                o = { disabledClass: "moto-entertainment__animation_disabled", ignoreVisibilityClass: "moto-entertainment__animation_ignore-visibility" };
            function i(e, t) {
                var n;
                return (n = e.find("." + t)), e.hasClass(t) && n.push(e.get(0)), n;
            }
            function r() {
                WOW.apply(this, arguments), (t = angular.isDefined(this.config.resetAnimation)), n && console.info("MotoAnimation : WOW engine is : ", t ? "1.3.0" : "1.1.2");
            }
            return (
                (this.setOptions = function (e) {
                    return !!angular.isObject(e) && (angular.extend(o, e), !0);
                }),
                (((r.prototype = Object.create(WOW.prototype)).constructor = r).prototype._inited = !1),
                (r.prototype.debugMode = function (e) {
                    n = e;
                }),
                (r.prototype.dump = function () {
                    console.info("DUMP"), console.log("   this.all", this.all.length, this.all), console.log("   this.boxes", this.boxes.length, this.boxes);
                }),
                (r.prototype.pingPong = function () {
                    n && console.log("MotoAnimation : PingPong"), this.scrollHandler();
                }),
                (r.prototype.forceSyncElements = function (e) {
                    var t;
                    return this._inited
                        ? ((t = i(e, this.config.boxClass)),
                          n && console.log("MotoAnimation : forceSync, found", t.length),
                          t.length &&
                              t.each(
                                  function (e, t) {
                                      this.boxes.indexOf(t) < 0 && (this.boxes.push(t), this.applyStyle(t, !0));
                                  }.bind(this)
                              ),
                          !0)
                        : (n && console.warn("MotoAnimation : WOW engine not started"), !1);
                }),
                (r.prototype.RENAMEResetStyle = function (e) {
                    var t;
                    return this._inited
                        ? ((t = i(e, this.config.boxClass)),
                          n && console.log("MotoAnimation : RENAMEResetStyle, found", t.length),
                          t.length &&
                              t.each(
                                  function (e, t) {
                                      this.applyStyle(t, !0);
                                  }.bind(this)
                              ),
                          !0)
                        : (n && console.warn("MotoAnimation : WOW engine not started"), !1);
                }),
                (r.prototype.disableByElement = function (e) {
                    n && console.log("MotoAnimation : disableByElement", e), $(e).addClass(o.disabledClass);
                }),
                (r.prototype.enableByElement = function (e) {
                    n && console.log("MotoAnimation : enableByElement", e), $(e).removeClass(o.disabledClass), this.pingPong();
                }),
                (r.prototype.isVisible = function (e) {
                    var t = $(e);
                    try {
                        if (t.hasClass(o.disabledClass) || t.closest("." + o.disabledClass).length) return !1;
                        if (t.hasClass(o.ignoreVisibilityClass) || t.closest("." + o.ignoreVisibilityClass).length) return !0;
                        if (t.closest(".moto-popup_content").length) return !0;
                    } catch (e) {}
                    return WOW.prototype.isVisible.call(this, e);
                }),
                (r.prototype.init = function (e) {
                    var t;
                    return !!e && (n && console.log("MotoAnimation : init WOW"), (t = WOW.prototype.init.call(this)), (this._inited = !0), n && console.log("MotoAnimation : WOW started"), t);
                }),
                (e = new r({ boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0, live: !0, callback: null })),
                $(document).ready(function () {
                    e.init(!0);
                }),
                (this.$get = [
                    function () {
                        return e;
                    },
                ]),
                this
            );
        },
    ]),
    angular.module("website.core.animation").directive("motoWidgetAnimated", [
        "website.MotoAnimation",
        function (o) {
            return {
                restrict: "C",
                link: function (e, t, n) {
                    t.hasClass("moto-widget_with-deferred-content") &&
                        (t.on("motoWidgetStartLoading", function (e) {
                            o.disableByElement(t[0]);
                        }),
                        t.on("motoWidgetIsFullyLoaded", function (e) {
                            o.enableByElement(t[0]);
                        }));
                },
            };
        },
    ]),
    angular.module("website.core.dependency").directive("motoDependencyRequire", [
        "motoDependencyService",
        function (r) {
            return {
                restrict: "A",
                link: function (e, t, n) {
                    var o = n.motoDependencyRequire,
                        i = o;
                    try {
                        (i = e.$eval(i)), angular.isUndefined(i) && (i = o);
                    } catch (e) {
                        i = o;
                    }
                    angular.isFunction(i) && (i = i()), r.require(i);
                },
            };
        },
    ]),
    angular.module("website.core.dependency").provider("motoDependencyService", [
        "motoWebsiteSettingsServiceProvider",
        function (o) {
            var i = null,
                t = {},
                r = angular.element("head").get(0),
                n = angular.element("body").get(0),
                a = {};
            function s(e) {
                if (!angular.isArray(e)) {
                    try {
                        if (!a[e]) return !1;
                        var t = a[e],
                            n = t.scriptId || "connector_" + e,
                            o = document.getElementById(n);
                        if (o) return;
                        ((o = document.createElement("script")).id = n), (o.src = t.getUrl()), (o.type = "text/javascript"), t.preInject(o), r.appendChild(o), t.postInject(o);
                    } catch (e) {
                        return !1;
                    }
                    return !0;
                }
                angular.forEach(e, function (e) {
                    s(e);
                });
            }
            function e(e) {
                return a[e];
            }
            (a = {
                disqus: {
                    name: "disqus",
                    urlTemplate: "//{{shortname}}.disqus.com/embed.js",
                    params: {},
                    setParams: function (e) {
                        for (var t in e) e.hasOwnProperty(t) && this.setParam(t, e[t]);
                        return this;
                    },
                    getParams: function () {
                        return this.params;
                    },
                    setParam: function (e, t) {
                        return "" != (this.params[e] = t) && (window["disqus_" + e] = t), this;
                    },
                    getParam: function (e, t) {
                        return angular.isUndefined(this.params[e]) ? (angular.isUndefined(window["disqus_" + e]) ? t : window["disqus_" + e]) : this.params[e];
                    },
                    getUrl: function () {
                        return this.urlTemplate.replace(/\{\{shortname\}\}/gi, this.getParam("shortname"));
                    },
                    preInject: angular.noop,
                    postInject: angular.noop,
                    require: function () {
                        return t.require(this.name), this;
                    },
                },
                facebook: {
                    name: "facebook",
                    scriptId: "facebook-jssdk",
                    urlTemplate: "//connect.facebook.net/{{language}}/sdk.js#{{params}}",
                    language: "en_US",
                    getLanguage: function () {
                        return this.language;
                    },
                    setLanguage: function (e) {
                        return (this.language = e);
                    },
                    getUrl: function () {
                        return this.urlTemplate.replace(/\{\{language\}\}/gi, this.getLanguage()).replace(
                            /\{\{params\}\}/gi,
                            (function (e) {
                                var t = [];
                                for (var n in e) 0 < e[n].length && t.push(n + "=" + e[n]);
                                return t.join("&");
                            })(this.getParams())
                        );
                    },
                    params: { version: "v2.8", xfbml: "1", appId: "" },
                    setParams: function (e) {
                        for (var t in e) e.hasOwnProperty(t) && this.setParam(t, e[t]);
                        return this;
                    },
                    getParams: function () {
                        return this.params;
                    },
                    setParam: function (e, t) {
                        return (this.params[e] = t), this;
                    },
                    getParam: function (e, t) {
                        return angular.isUndefined(this.params[e]) ? t : this.params[e];
                    },
                    preInject: function (e) {
                        var t = document.getElementById("fb-root");
                        t || (((t = document.createElement("div")).id = "fb-root"), n.appendChild(t));
                    },
                    postInject: angular.noop,
                    require: function () {
                        return t.require(this.name), this;
                    },
                },
                twitter: {
                    name: "twitter",
                    scriptId: "twitter-wjs",
                    url: "//platform.twitter.com/widgets.js",
                    getUrl: function () {
                        return this.url;
                    },
                    params: {},
                    setParams: function (e) {
                        for (var t in e) e.hasOwnProperty(t) && this.setParam(t, e[t]);
                        return this;
                    },
                    getParams: function () {
                        return this.params;
                    },
                    setParam: function (e, t) {
                        return (this.params[e] = t), this;
                    },
                    getParam: function (e, t) {
                        return angular.isUndefined(this.params[e]) ? t : this.params[e];
                    },
                    preInject: angular.noop,
                    postInject: angular.noop,
                    require: function () {
                        return t.require(this.name), this;
                    },
                },
                pinterest: {
                    name: "pinterest",
                    scriptUrl: "//assets.pinterest.com/js/pinit.js",
                    getUrl: function () {
                        return this.scriptUrl;
                    },
                    preInject: angular.noop,
                    postInject: angular.noop,
                    require: function () {
                        return t.require(this.name), this;
                    },
                },
                linkedin: {
                    name: "linkedin",
                    scriptUrl: "//platform.linkedin.com/in.js",
                    getUrl: function () {
                        return this.scriptUrl;
                    },
                    preInject: function (e) {
                        var t = o.get("preferredLocale", "en_US"),
                            n = e.innerText;
                        (window._DependencyServiceOnLinkedInLoad = function () {
                            i && i.$emit("motoDependencyService.linkedin.loaded"), (window._DependencyServiceOnLinkedInLoad = function () {});
                        }),
                            (n += " onLoad: _DependencyServiceOnLinkedInLoad\n"),
                            t && (n += " lang: " + t),
                            (e.textContent = n);
                    },
                    postInject: angular.noop,
                    require: function () {
                        return t.require(this.name), this;
                    },
                },
                instagram_post: {
                    name: "instagram_post",
                    scriptUrl: "https://www.instagram.com/embed.js",
                    getUrl: function () {
                        return this.scriptUrl;
                    },
                    preInject: angular.noop,
                    postInject: angular.noop,
                    require: function () {
                        return t.require(this.name), this;
                    },
                },
                airbnb_embed: {
                    name: "airbnb_embed",
                    scriptUrl: "//airbnb.com/embeddable/airbnb_jssdk",
                    getUrl: function () {
                        return this.scriptUrl;
                    },
                    preInject: angular.noop,
                    postInject: angular.noop,
                    require: function () {
                        return t.require(this.name), this;
                    },
                },
            }),
                (this.require = s),
                (t.require = s),
                (this.get = e),
                (t.get = e),
                (this.$get = [
                    "$rootScope",
                    function (e) {
                        return (i = e), t;
                    },
                ]);
        },
    ]),
    angular.module("website.core.entertainment").provider("website.Entertainment", [
        "website.MotoAnimationProvider",
        function (e) {
            var i = {
                    animationDisabled: "moto-entertainment__animation_disabled",
                    animationIgnoring: "moto-entertainment__animation_ignore-visibility",
                    videoDisabled: "moto-entertainment__video_disabled",
                    playingDisabled: "moto-entertainment__playing_disabled",
                },
                n = "LetsDance",
                o = "LetsRest",
                r = "LetsStop";
            function a(e) {
                return !!(e && e.$evalAsync && e.$watch);
            }
            function s(e) {
                return !!(e && angular.isDefined(e.id) && e.$scope && e.$element);
            }
            return (
                (this.$get = [
                    "website.MotoAnimation",
                    function (t) {
                        function e() {}
                        return (
                            (e.prototype.getCssClass = function (n) {
                                var o = null;
                                return (
                                    angular.isString(n)
                                        ? (o = i[n] || o)
                                        : angular.isArray(n) &&
                                          ((o = ""),
                                          angular.forEach(i, function (e, t) {
                                              -1 < n.indexOf(t) && (o += e + " ");
                                          }),
                                          (o = o.trim())),
                                    o
                                );
                            }),
                            (e.prototype.isDisabledPlaying = function (e) {
                                return !this.isEnabledPlaying(e);
                            }),
                            (e.prototype.isEnabledPlaying = function (e) {
                                return !(e.hasClass(i.playingDisabled) || e.closest("." + i.playingDisabled).length);
                            }),
                            (e.prototype.enablePlaying = function (e) {
                                return s(e) && (e = e.$element), !(!e || !e.removeClass) && (e.removeClass(i.playingDisabled), !0);
                            }),
                            (e.prototype.disablePlaying = function (e) {
                                return s(e) && (e = e.$element), !(!e || !e.addClass) && (e.addClass(i.playingDisabled), !0);
                            }),
                            (e.prototype.letsStartAnimation = function (e) {
                                t.forceSyncElements(e.$content), t.enableByElement(e.$content), t.pingPong();
                            }),
                            (e.prototype.letsBlockAnimation = function (e) {
                                t.disableByElement(e.$content);
                            }),
                            (e.prototype.letsStopAnimation = function (e) {
                                this.letsBlockAnimation(e), t.RENAMEResetStyle(e.$content);
                            }),
                            (e.prototype.letsDance = function (e) {
                                this.enablePlaying(e), s(e) && (e = e.$scope), a(e) && e.$broadcast(n);
                            }),
                            (e.prototype.letsRestDancing = function (e) {
                                this.disablePlaying(e), s(e) && (e = e.$scope), a(e) && e.$broadcast(o);
                            }),
                            (e.prototype.letsStopDancing = function (e) {
                                this.disablePlaying(e), s(e) && (e = e.$scope), a(e) && e.$broadcast(r);
                            }),
                            (e.prototype.$onLetsDanceEvent = function (e, t) {
                                return e.$scope.$on(n, t);
                            }),
                            (e.prototype.$onLetsRestEvent = function (e, t) {
                                return e.$scope.$on(o, t);
                            }),
                            (e.prototype.$onLetsStopEvent = function (e, t) {
                                return e.$scope.$on(r, t);
                            }),
                            new e()
                        );
                    },
                ]),
                this
            );
        },
    ]),
    angular.module("website.core.humanize_duration").filter("humanizeDuration", [
        "motoHumanizeDuration",
        function (o) {
            return function (e, t, n) {
                return o.humanize(e, t, n);
            };
        },
    ]),
    angular.module("website.core.humanize_duration").provider("motoHumanizeDuration", [
        function () {
            var e = this,
                i = { y: 315576e5, mo: 26298e5, w: 6048e5, d: 864e5, h: 36e5, m: 6e4, s: 1e3, ms: 1 },
                r = { years: "y", months: "mo", weeks: "w", days: "d", hours: "h", minutes: "m", seconds: "s", milliseconds: "ms" };
            (this.humanize = function (e, t, n) {
                var o;
                return (
                    (!n || humanizeDuration.getSupportedLanguages().indexOf(n) < 0) && (n = "en"), r[t] && (t = r[t]), (o = humanizeDuration(e * i[t], { spacer: ">", language: n, units: [t], round: !0 })).substr(o.indexOf(">") + ">".length)
                );
            }),
                (this.$get = [
                    function () {
                        return e;
                    },
                ]);
        },
    ]),
    angular.module("website.core.media").service("website.MediaService", [
        "motoBeforeInViewport",
        function (n) {
            var o = [],
                i = this,
                t = !1;
            function r() {
                return !1;
            }
            (this.registerItem = function (e) {
                return (
                    !!angular.isObject(e) &&
                    ((e.autoplay = angular.isObject(e.autoplay) ? e.autoplay : { enabled: !1 }),
                    (e.autoplay.allowed = !angular.isDefined(e.autoplay.allowed) || e.autoplay.allowed),
                    (e.isPlaying = angular.isFunction(e.isPlaying) ? e.isPlaying : r),
                    (e.pause = angular.isFunction(e.pause) ? e.pause : angular.noop),
                    (e.ready = !!e.ready),
                    (t = e.scope) &&
                        t.$evalAsync &&
                        t.$watch &&
                        e.scope.$on("$destroy", function () {
                            o.splice(o.indexOf(e), 1);
                        }),
                    o.push(e),
                    e.ready && this.itemReady(e),
                    e)
                );
                var t;
            }),
                (this.itemReady = function (e) {
                    (e.ready = !0), this.areAllItemsReady() && this.runAutoplayProcedure();
                }),
                (this.areAllItemsReady = function () {
                    return !o.some(function (e) {
                        return !e.ready;
                    });
                }),
                (this.checkAndAutoplayItem = function (e) {
                    function t() {
                        e.autoplay.allowed && (e.autoplay.forced ? (i.pauseAll(), e.play()) : i.isAnyPlaying() || e.play());
                    }
                    e.autoplay.enabled &&
                        ("onFirstVisible" === e.autoplay.startOn
                            ? n.startWatching({
                                  element: e.node,
                                  onEnter: function () {
                                      t();
                                  },
                              })
                            : t());
                }),
                (this.isAnyPlaying = function () {
                    return o.some(function (e) {
                        return e.isPlaying();
                    });
                }),
                (this.pauseAll = function () {
                    o.forEach(function (e) {
                        e.pause();
                    });
                }),
                (this.autoplayFailed = function () {
                    t ||
                        ((t = !0),
                        $("body").on("click", function e() {
                            i.areAllItemsReady() && ((t = !1), $("body").off("click", e), i.runAutoplayProcedure());
                        }));
                }),
                (this.runAutoplayProcedure = function () {
                    o.forEach(function (e) {
                        i.checkAndAutoplayItem(e);
                    });
                });
        },
    ]),
    angular.module("website.core.utils").service("website.ElementHeightWatcherClass", [
        function () {
            function e(e) {
                if (!angular.isObject(e)) throw new Error("Invalid params");
                if (!angular.isElement(e.$element)) throw new Error("$element is not Element");
                if (!angular.isString(e.watchSelector) || "" === e.watchSelector) throw new Error("watchSelector is empty");
                (this._options = angular.copy(this._options)),
                    angular.extend(this._options, e),
                    (this.$element = $(e.$element)),
                    (this._onResizeHandler = this.update.bind(this)),
                    $(window).on("resize", this._onResizeHandler),
                    (this._timer = setInterval(this.update.bind(this), this._options.delay));
            }
            return (
                (e.prototype._options = { delay: 250 }),
                (e.prototype.$element = null),
                (e.prototype._onResizeHandler = null),
                (e.prototype._timer = null),
                (e.prototype._visible = !1),
                (e.prototype._getMaxHeight = function (e) {
                    var t,
                        n = 0;
                    return (
                        (t = $(e)),
                        angular.forEach(t, function (e) {
                            n = Math.max($(e).outerHeight(), n);
                        }),
                        n
                    );
                }),
                (e.prototype.update = function () {
                    return !!this._visible && (this.$element.css("min-height", this._getMaxHeight(this._options.watchSelector) + "px"), !0);
                }),
                (e.prototype.show = function () {
                    this.$element.show(), (this._visible = !0), this.update();
                }),
                (e.prototype.hide = function () {
                    this.$element.hide(), (this._visible = !1);
                }),
                (e.prototype.disconnect = function () {
                    (this.$element = null), (this.calcSizeFunction = angular.noop), $(window).off("resize", this._onResizeHandler), clearInterval(this._timer);
                }),
                (e.prototype.destroy = function () {
                    this.$element.remove(), this.disconnect();
                }),
                e
            );
        },
    ]),
    angular.module("website.core.settings").provider("motoWebsiteSettingsService", [
        function (n) {
            var o = this,
                i = {};
            (this.get = function (e, t) {
                return e === n ? i : i[e] !== n ? i[e] : t || null;
            }),
                (this.set = function (e, t) {
                    if (!angular.isObject(e)) return (i[e] = t), o;
                    for (var n in e) e.hasOwnProperty(n) && o.set(n, e[n]);
                }),
                (this.$get = [
                    function () {
                        return o;
                    },
                ]);
        },
    ]),
    angular.module("website.core.widgets").service("website.ContentWidgetClass", [
        "website.MotoAnimation",
        "website.Entertainment",
        "website.WidgetCollectionClass",
        "motoBeforeInViewport",
        function (e, t, n, o) {
            function i(e) {
                var t;
                angular.isElement(e) ? (t = e) : !angular.isElement(e) && angular.isObject(e) && ((this.id = e.id), (this.name = e.name), (t = e.$element), this.setScope(e.$scope)),
                    angular.isElement(t) && this.setElement(t),
                    (this.children = new n());
            }
            return (
                (i.prototype._debug = !1),
                (i.prototype.id = null),
                (i.prototype.name = null),
                (i.prototype.$element = null),
                (i.prototype.$scope = null),
                (i.prototype.$content = null),
                (i.prototype.children = null),
                (i.prototype._parent = null),
                (i.prototype.setParent = function (e) {
                    return this._parent ? this._parent === e : e instanceof i && ((this._parent = e), !0);
                }),
                (i.prototype.getParent = function () {
                    return this._parent;
                }),
                (i.prototype.addChild = function (e) {
                    return !!this.children.push(e) && (e.setParent(this), !0);
                }),
                (i.prototype.getChild = function (e) {
                    return this.children.getById(e) || this.children.getByIndex(e);
                }),
                (i.prototype.setElement = function (e) {
                    return this.$element
                        ? this.$element === e
                        : !!angular.isElement(e) && ((this.$element = e), (this.id = e.attr("id") || this.id), (this.name = e.attr("data-widget") || this.name), (this.$content = e.find("#" + this.id + "__content") || this.$element), !0);
                }),
                (i.prototype.setScope = function (e) {
                    return this.$scope ? this.$scope === e : !!((t = e) && t.$evalAsync && t.$watch) && ((this.$scope = e), !0);
                    var t;
                }),
                (i.prototype.getScope = function () {
                    return this.$scope;
                }),
                (i.prototype.onVisibleImmediately = function (e) {
                    this._debug && console.warn(this.name, "onVisibleImmediately #", this.id, e), this.onArriving(e), this.onArrived(e);
                }),
                (i.prototype.onArriving = function (e) {
                    this._debug && console.warn(this.name, "onArriving #", this.id, e), "onArriving" === e.startAnimation && t.letsStartAnimation(this), t.letsDance(this), o.elementIsVisible(this.$element);
                }),
                (i.prototype.onArrived = function (e) {
                    this._debug && console.warn(this.name, "onArrived #", this.id, e), "onArrived" === e.startAnimation && t.letsStartAnimation(this);
                }),
                (i.prototype.onVanishing = function (e) {
                    this._debug && console.warn(this.name, "onVanishing #", this.id, e), t.letsStopAnimation(this), t.letsStopDancing(this), o.elementIsInvisible(this.$element);
                }),
                (i.prototype.onVanished = function (e) {
                    this._debug && console.warn(this.name, "onVanished #", this.id, e);
                }),
                (i.prototype.onResizing = function (e) {
                    this._debug && console.warn(this.name, "onResizing #", this.id, e);
                }),
                i
            );
        },
    ]),
    angular.module("website.core.widgets").directive("motoWidgetWithDeferredContent", [
        function () {
            var r = "lazyload",
                a = "lazyloading",
                s = "moto-widget-deferred_loading",
                t = "moto-widget-deferred_ready",
                l = { startLoading: "motoWidgetStartLoading", itemLoaded: "motoWidgetItemLoaded", fullyLoaded: "motoWidgetIsFullyLoaded" },
                c = new Map();
            function u(e, t) {
                var n,
                    o,
                    i = !1;
                switch (e.prop("tagName").toLowerCase()) {
                    case "iframe":
                        (o = t),
                            (n = e).one("load", function () {
                                d(n, o);
                            }),
                            (i = !0);
                        break;
                    case "img":
                        i = (function (e, t) {
                            function n() {
                                d(e, t);
                            }
                            if (e.hasClass(r) || e.hasClass(a)) return e.one("lazyloaded", n), !0;
                            return !e[0].complete && (e.one("load", n), e.one("error", n), !0);
                        })(e, t);
                        break;
                    case "input":
                        i = (function (e, t) {
                            if (e.hasClass(r) || e.hasClass(a))
                                return (
                                    e.one("lazyloaded", function () {
                                        d(e, t);
                                    }),
                                    !0
                                );
                            return !1;
                        })(e, t);
                }
                i && c.get(t).push(e);
            }
            function d(e, t) {
                var n = c.get(t) || [],
                    o = n.indexOf(e);
                -1 < o && n.splice(o, 1), t.trigger(l.itemLoaded, [e]), 0 === n.length && m(t);
            }
            function m(e) {
                c.delete(e), e.removeClass(s).addClass(t).trigger(l.fullyLoaded);
            }
            return {
                restrict: "C",
                priority: 100,
                link: function (e, n) {
                    var t,
                        o,
                        i = n.find(".moto-widget-deferred-content");
                    i.length &&
                        ((o = n),
                        c.set(o, []),
                        o.addClass(s).trigger(l.startLoading),
                        i.each(function (e, t) {
                            u($(t), n);
                        }),
                        (t = n),
                        0 === c.get(t).length && m(t));
                },
            };
        },
    ]),
    angular.module("website.core.widgets").service("website.WidgetCollectionClass", [
        function () {
            function o(e, t, n, o) {
                var i,
                    r = e.length,
                    a = [];
                for (i = n; i < r && (t(e[i]) && a.push(e[i]), !(-1 < o && a.length === o)); i++);
                return a;
            }
            function t(e) {
                (this._items = []), (this._index = { byId: {} }), this.pushItems(e);
            }
            return (
                (t.prototype._items = []),
                (t.prototype._index = {}),
                (t.prototype.all = function () {
                    return this._items;
                }),
                (t.prototype.push = function (e) {
                    return !!((t = e) && angular.isDefined(t.id) && angular.isDefined(t.$scope) && t.$element && angular.isFunction(t.setParent)) && !this.getById(e.id) && (this._items.push(e), (this._index.byId[e.id] = e), !0);
                    var t;
                }),
                (t.prototype.pushItems = function (e) {
                    return e instanceof t && (e = e.all()), !!angular.isArray(e) && (angular.forEach(e, this.push.bind(this)), !0);
                }),
                (t.prototype.getById = function (e) {
                    return this._index.byId[e] || null;
                }),
                (t.prototype.getByIndex = function (e) {
                    return this._items[e] || null;
                }),
                (t.prototype.isEmpty = function () {
                    return this._items.length < 1;
                }),
                (t.prototype.count = function () {
                    return this._items.length;
                }),
                (t.prototype.first = function (e, t) {
                    var n;
                    return (n = angular.isFunction(e) ? o(this._items, e, 0, 1)[0] : this.getByIndex(0)), angular.isUndefined(t) && (t = null), n || t;
                }),
                (t.prototype.last = function () {
                    return this.getByIndex(this.count() - 1);
                }),
                (t.prototype.removeById = function (e) {
                    var t, n;
                    return this._index.byId[e] && ((t = this._index.byId[e]), delete this._index.byId[e], 0 <= (n = this._items.indexOf(t)) && this._items.splice(n, 1)), !0;
                }),
                (t.prototype.filter = function (e) {
                    return !!angular.isFunction(e) && new t(this._items.filter(e));
                }),
                (t.prototype.where = function (t, n) {
                    return this.filter(function (e) {
                        return e[t] === n;
                    });
                }),
                (t.prototype.firstWhere = function (t, n) {
                    return (
                        o(
                            this._items,
                            function (e) {
                                return e[t] === n;
                            },
                            0,
                            1
                        )[0] || null
                    );
                }),
                t
            );
        },
    ]),
    angular.module("website.core.widgets").service("website.WidgetsRepository", [
        "website.ContentWidgetClass",
        "website.WidgetCollectionClass",
        function (o, e) {
            var i;
            function t() {
                this._collection = new e();
            }
            return (
                (t.prototype._collection = null),
                (t.prototype.setDefaultParent = function (e) {
                    return !!((e && e instanceof o) || null === e) && ((i = e), !0);
                }),
                (t.prototype.getDefaultParent = function () {
                    return i;
                }),
                (t.prototype.forget = function (e) {
                    var t, n;
                    if ((e instanceof o ? (t = e) : angular.isString(e) && (t = this._collection.getById(e)), !t)) return !1;
                    (n = t.children.all()).length && n.forEach(this.forget.bind(this)), this._collection.removeById(t.id);
                }),
                (t.prototype.registry = function (e) {
                    var t, n;
                    return (
                        !!angular.isObject(e) &&
                        (e instanceof o || (e = new o(e)),
                        e instanceof o &&
                            (this.isExists(e.id) && this.forget(e.id),
                            !this.isExists(e.id) && !!this._collection.push(e) && ((t = e.$element.attr("data-parent-id")), (n = this._collection.getById(t)) ? e.setParent(n) : i && e.setParent(i), (n = e.getParent()) && n.addChild(e), e)))
                    );
                }),
                (t.prototype.isExists = function (e) {
                    return !!this._collection.getById(e);
                }),
                (t.prototype.filter = function (e) {
                    return this._collection.filter(e);
                }),
                (t.prototype.where = function (e, t) {
                    return this._collection.where(e, t);
                }),
                (t.prototype.firstWhere = function (e, t) {
                    return this._collection.firstWhere(e, t);
                }),
                new t()
            );
        },
    ]),
    angular.module("website.LiveChat").provider("websiteLiveChat", [
        "website.LiveChat.settings",
        function (t) {
            var e,
                n,
                o = {};
            function i(e, t) {
                (this._provider = e), (this._options = t);
            }
            function r() {}
            function a() {
                i.apply(this, arguments);
            }
            return (
                angular.isObject(t) || (t = { provider: "none" }),
                ((i.prototype = {})._provider = null),
                (i.prototype._options = {}),
                (i.prototype._booted = !1),
                (i.prototype._booting = !1),
                (i.prototype.boot = function () {
                    return console.warn('Method "boot" not implemented'), !1;
                }),
                (i.prototype.isReady = function () {
                    return this._booted;
                }),
                ((r.prototype = {}).boot = function () {
                    var e;
                    return !!this.isEnabled() && !!this.isRegisteredProvider(this.getProviderName()) && !n && !!(e = this.getApiProviderConstructor(this.getProviderName())) && ((n = new e(this, t.options)).boot(), !0);
                }),
                (r.prototype.getProviderName = function () {
                    return t.provider;
                }),
                (r.prototype.isEnabled = function () {
                    return "none" !== t.provider;
                }),
                (r.prototype.registerApiConnector = function (e, t) {
                    return !angular.isString(e) || e.trim().length < 1
                        ? (console.warn("LiveChatProvider : cant register provider, invalid name", e), !1)
                        : angular.isFunction(t)
                        ? t.prototype instanceof i
                            ? ((e = e.trim()), (o[e] = { name: e, constructor: t }), !0)
                            : (console.warn("LiveChatProvider : invalid constructor", t), !1)
                        : (console.warn("LiveChatProvider : cant register provider constructor", t), !1);
                }),
                (r.prototype.isRegisteredProvider = function (e) {
                    return !!o[e];
                }),
                (r.prototype.getApiProviderConstructor = function (e) {
                    return this.isRegisteredProvider(e) ? o[e].constructor : (console.warn('LiveChatProvider : provider "', e, '" not exists'), null);
                }),
                (r.prototype.getApiProvider = function () {
                    return n;
                }),
                (r.prototype.$get = [
                    function () {
                        return e;
                    },
                ]),
                (e = new r()),
                (((a.prototype = Object.create(i.prototype)).constructor = a).prototype.boot = function () {
                    return (
                        !this._booted &&
                        !this._booting &&
                        ((this._booting = !0),
                        (window.__lc = window.__lc || {}),
                        this.isShowOnlyAgentsAreAvailable() && this._getTempStyleNode().html("#chat-widget-container {display:none !important}"),
                        (window.__lc.license = window.__lc.license || this._options.licenceNumber),
                        !!window.__lc.license &&
                            ((function (e, t, n) {
                                function o(e) {
                                    return i._h ? i._h.apply(null, e) : i._q.push(e);
                                }
                                var i = {
                                    _q: [],
                                    _h: null,
                                    _v: "2.0",
                                    on: function () {
                                        o(["on", n.call(arguments)]);
                                    },
                                    once: function () {
                                        o(["once", n.call(arguments)]);
                                    },
                                    off: function () {
                                        o(["off", n.call(arguments)]);
                                    },
                                    get: function () {
                                        if (!i._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
                                        return o(["get", n.call(arguments)]);
                                    },
                                    call: function () {
                                        o(["call", n.call(arguments)]);
                                    },
                                    init: function () {
                                        var e = t.createElement("script");
                                        (e.async = !0), (e.type = "text/javascript"), (e.src = "https://cdn.livechatinc.com/tracking.js"), t.head.appendChild(e);
                                    },
                                };
                                !e.__lc.asyncInit && i.init(), (e.LiveChatWidget = e.LiveChatWidget || i);
                            })(window, document, [].slice),
                            window.LiveChatWidget.once("ready", this._onReadyHandler.bind(this)),
                            !0))
                    );
                }),
                (a.prototype._onReadyHandler = function (e) {
                    var t = window.LiveChatWidget,
                        n = this._getTempStyleNode();
                    if (!t) return console.error("LiveChatInc : cant retrieve access to LiveChatWidget"), !1;
                    try {
                        (this._booted = !0), (this._booting = !1), this.isShowOnlyAgentsAreAvailable() && "online" !== e.state.availability && t.call("hide");
                    } catch (e) {
                        console.error(e);
                    }
                    setTimeout(function () {
                        n.remove();
                    }, 250);
                }),
                (a.prototype._getTempStyleNode = function () {
                    var e = "motoLiveChatTempStyle",
                        t = null;
                    return (t = document.getElementById(e)) || ((t = document.createElement("style")).setAttribute("id", e), document.body.appendChild(t)), $("#" + e);
                }),
                (a.prototype.isShowOnlyAgentsAreAvailable = function () {
                    return angular.isDefined(this._options.showOnlyAgentsAreAvailable) && this._options.showOnlyAgentsAreAvailable;
                }),
                e.registerApiConnector("LiveChatInc", a),
                e.boot(),
                e
            );
        },
    ]);
try {
    angular.module("website.LiveChat.settings");
} catch (e) {
    angular.module("website.LiveChat.settings", []).constant("website.LiveChat.settings", null);
}
angular.module("website").directive("motoBackgroundVideo", [
    "website.Entertainment",
    function (r) {
        return {
            restrict: "A",
            scope: !0,
            link: function (e, t) {
                var n = t.find("video"),
                    o = n.get(0),
                    i = { $scope: e, $element: t };
                o &&
                    (t.motoVideoBackground(),
                    n.attr("playsinline", ""),
                    r.$onLetsDanceEvent(i, function (e) {
                        if ((t.motoVideoBackground(), o.paused && !r.isDisabledPlaying(t)))
                            try {
                                o.play()
                                    .then(
                                        function () {},
                                        function (e) {}
                                    )
                                    .catch(function (e) {});
                            } catch (e) {
                                console.error(e);
                            }
                    }),
                    r.$onLetsRestEvent(i, function (e) {
                        o.paused || o.pause();
                    }),
                    r.$onLetsStopEvent(i, function (e) {
                        o.paused || (o.pause(), (o.currentTime = 0));
                    }));
            },
        };
    },
]),
    angular.module("website").directive("motoCookieNotification", [
        "website.MotoStorageService",
        function (r) {
            return {
                restrict: "C",
                link: function (e, o) {
                    var i = o.attr("data-content-hash");
                    if (localStorage.getItem("cookie-notification-applied") !== i) {
                        o.addClass("moto-cookie-notification_visible");
                    }
                    e.closeNotification = function (e, t) {
                        e.preventDefault();
                        o.fadeOut();
                        localStorage.setItem("cookie-notification-applied", i);
                    };
                },
            };
        }
        
    ]),
    angular.module("website").service("MotoIntervalService", [
        "$interval",
        function (e) {
            var t = null,
                n = [];
            function o(e) {
                e && e();
            }
            function i() {
                n.forEach(o);
            }
            (this.registerCallback = function (e) {
                return !angular.isFunction(e) || -1 < n.indexOf(e)
                    ? angular.noop
                    : (n.push(e),
                      function () {
                          n[n.indexOf(e)] = null;
                      });
            }),
                (this.start = function () {
                    t = e(i, 100);
                }),
                (this.stop = function () {
                    e.cancel(t);
                }),
                this.start();
        },
    ]),
    angular.module("website.moto_link").run([
        function () {
            function t(e) {
                var t = e.indexOf("#");
                return -1 === t ? e : e.substring(0, t);
            }
            function n(e) {
                var t = e.indexOf("#");
                return -1 === t ? null : e.substring(t + 1, e.length);
            }
            $("body").on("click", ".moto-link[data-action=page]", function (e) {
                return (
                    $(e.currentTarget).parents(".mfp-content").length &&
                        t(window.location.href) === t(e.currentTarget.href) &&
                        n(e.currentTarget.href) &&
                        !$(".mfp-content").find("a.moto-anchor[name=" + n(e.currentTarget.href) + "]").length &&
                        $.magnificPopup.close(),
                    e
                );
            });
        },
    ]),
    angular.module("website.moto_link").directive("motoInitLightboxGallery", function () {
        var o = "[data-moto-lightbox-item]",
            i = "[data-moto-lightbox-link]",
            r = "[data-moto-lightbox-caption]",
            a = "data-moto-lightbox-caption-class";
        return {
            restrict: "A",
            link: function (e, t, n) {
                t.magnificPopup({
                    delegate: "a[data-action=lightbox]" + i,
                    type: "image",
                    tClose: "",
                    tLoading: "",
                    mainClass: angular.isDefined(n.lightboxGalleryShowCounter) ? "" : "moto-lightbox_hidden-counter",
                    autoFocusLast: !1,
                    gallery: { enabled: !0, preload: [5, 10], tPrev: "", tNext: "", tCounter: "%curr% / %total%" },
                    image: {
                        titleSrc: function (e) {
                            var t = angular.element(e.el.context).closest(o).find(r).clone(),
                                n = t.attr(a);
                            return (
                                n &&
                                    (t.find('[class*="moto-text_"]').each(function () {
                                        this.className = this.className.replace(/moto-text_[^\s]+/g, n);
                                    }),
                                    (t = t.wrapInner("<div class=" + n + "></div>"))),
                                (t = t.wrapInner('<div class="moto-widget-text"></div>')).html() || ""
                            );
                        },
                    },
                    zoom: { enabled: !0, duration: 400, easing: "ease-in-out" },
                });
            },
        };
    }),
    angular.module("website.moto_link").run([
        "$timeout",
        function (o) {
            $("body").on("click", ".moto-link[data-action=lightbox]", function (e) {
                var t,
                    n = $(e.currentTarget);
                (!n.closest("[data-moto-lightbox-caption]").length && n.closest("[data-moto-init-lightbox-gallery]").length) ||
                    (n.data("lightboxCaption") && (t = '<div class="moto-widget-text">' + n.data("lightboxCaption") + "</div>"),
                    e.preventDefault(),
                    o(function () {
                        $.magnificPopup.close(),
                            $.magnificPopup.open({
                                items: { tClose: "", tLoading: "", src: n.attr("href"), title: t || n.attr("title") || "", type: "image" },
                                closeMarkup: '<button title="%title%" type="button" class="mfp-close fa fa-times"></button>',
                            });
                    }));
            });
        },
    ]),
    angular.module("website").service("website.MotoLinkActionService", [
        "$window",
        "website.MotoPopupService",
        function (t, n) {
            this.execute = function (e) {
                if (angular.isObject(e))
                    switch (e.action) {
                        case "popup":
                            angular.isNumber(e.id) && n.openPopup(e.id);
                            break;
                        case "lightbox":
                            angular.isString(e.url) && $.magnificPopup.open({ items: { tClose: "", tLoading: "", src: e.url, type: "image" }, closeMarkup: '<button title="%title%" type="button" class="mfp-close fa fa-times"></button>' });
                            break;
                        default:
                            if (angular.isString(e.url))
                                try {
                                    t.open(e.url, e.target);
                                } catch (e) {}
                    }
            };
        },
    ]),
    angular.module("website.moto_link").run([
        "website.MotoPopupService",
        function (i) {
            $("body").on("click", ".moto-link", function (e) {
                var t = $(e.currentTarget),
                    n = t.attr("data-popup-id"),
                    o = t.data("action");
                if (((n = parseInt(n)), "popup" === o && !(0 < n))) return !1;
                "popup" === o && (e.preventDefault(), i.openPopup(n));
            });
        },
    ]),
    angular.module("website.moto_link").run([
        function () {
            $("body").on("click", "a[data-moto-widget-actions-scroll-to]", function (e) {
                var t = $(e.currentTarget),
                    n = t.data("anchor"),
                    o = 1e3 * parseFloat(t.data("time") || "0.4");
                if (angular.isDefined(n)) {
                    var i = $('a[name="' + n + '"]');
                    e.preventDefault(), i.length && $("html, body").animate({ scrollTop: i.offset().top }, o);
                }
            });
        },
    ]),
    angular.module("website").service("website.MotoPopupService", [
        "$rootScope",
        "$timeout",
        "$q",
        "$compile",
        "website.MotoStorageService",
        "Website.Backend.RenderService",
        "currentFrontendSession",
        "website.Entertainment",
        "MotoScrollbarWatcherService",
        function (c, n, e, u, i, d, o, m, g) {
            var p,
                r = [];
            function f(e) {
                $(".mfp-content").css("width", e);
            }
            function h() {
                return angular.isObject($.magnificPopup.instance.currItem);
            }
            function a(o, i) {
                var r,
                    t = (window.websiteConfig && window.websiteConfig.popup_preferences && window.websiteConfig.popup_preferences.loading_error_message) || "",
                    a = !1,
                    s = h();
                function l() {
                    (s = !1), p && p.$destroy(), r && (r = e.reject(r, "rejecting"));
                }
                (i = angular.isFunction(i) ? i : angular.noop),
                    s && ($.magnificPopup.close(), l()),
                    (s = !0),
                    $.magnificPopup.open({
                        items: { src: '<div id="moto-popup-content"></div>', type: "inline" },
                        showCloseBtn: !1,
                        closeOnBgClick: !1,
                        mainClass: "moto-popup",
                        closeMarkup: '<button title="%title%" type="button" class="mfp-close fa fa-times"></button>',
                        callbacks: {
                            open: function () {
                                $.magnificPopup.instance.updateStatus("loading");
                            },
                            close: function () {
                                a || l();
                            },
                        },
                    }),
                    (r = d.render({ id: o }).then(
                        function (e) {
                            var t, n;
                            2 !== r.$$state.status &&
                                s &&
                                ((t = $(e.content)),
                                (a = !0),
                                $.magnificPopup.close(),
                                (a = !1),
                                $.magnificPopup.open({
                                    items: { src: t, type: "inline" },
                                    mainClass: "moto-popup",
                                    closeMarkup: '<button title="%title%" type="button" class="mfp-close fa fa-times"></button>',
                                    closeOnBgClick: !1,
                                    callbacks: {
                                        open: function () {
                                            f(e.properties.width),
                                                (p = c.$new()),
                                                (t = u(t)(p)),
                                                m.letsDance({ id: o, name: "@popup", $scope: p, $element: t }),
                                                (n = g.addWatcher(function () {
                                                    var e = window.document.createEvent("UIEvents");
                                                    e.initUIEvent("resize", !0, !1, window, 0), window.dispatchEvent(e);
                                                }, t[0])),
                                                i();
                                        },
                                        close: function () {
                                            n(), l();
                                        },
                                    },
                                }),
                                (s = !0));
                        },
                        function (e) {
                            s && ((s = !0), $.magnificPopup.instance.updateStatus("ready"), f("1200px"), $("#moto-popup-content").addClass("moto-popup__content_error").html(t));
                        }
                    ));
            }
            function s() {
                var e;
                h() || 0 === r.length || a((e = r.shift()).id, e.callback);
            }
            (this.init = function () {
                var t = $.magnificPopup.proto._close;
                ($.magnificPopup.proto._close = function () {
                    var e = t.apply(this, arguments);
                    return n(s, 500), e;
                }),
                    o.isNew && i.removeLocalStorageItem("popups-session");
            }),
                (this.pleaseOpenPopup = function (e, t) {
                    var n, o;
                    h() ? ((n = e), (o = t), r.push({ id: n, callback: o })) : a(e, t);
                }),
                (this.openPopup = a),
                (this.updateDataInStorage = function (e, t) {
                    var n,
                        o = "popups-storage";
                    "session" === t && (o = "popups-session"), (n = i.getLocalStorageItem(o, {}))[e] ? n[e].shows++ : (n[e] = { shows: 1 }), (n[e].timestamp = Date.now()), i.setLocalStorageItem(o, n);
                }),
                (this.shouldPopupBeOpened = function (e, t, n) {
                    var o;
                    return !(
                        "always" !== t &&
                        ("session" === t
                            ? (o = i.getLocalStorageItem("popups-session", {}))[e]
                            : ((o = i.getLocalStorageItem("popups-storage", {})), ("amount" === t && o[e] && o[e].shows >= n.shows) || ("overtime" === t && o[e] && Date.now() - o[e].timestamp < 1e3 * n.overtime)))
                    );
                });
        },
    ]),
    angular.module("website").directive("motoRelativeSticky", [
        function () {
            return {
                restrict: "A",
                link: function (e, t, n) {
                    t.addClass("moto-relative-sticky"), t.css("top", n.motoRelativeStickySpacing || 0);
                },
            };
        },
    ]),
    angular.module("website").service("MotoScrollbarWatcherService", [
        "MotoIntervalService",
        function (e) {
            var t = angular.noop,
                o = [];
            function n(e) {
                var t;
                return !!angular.isObject(e) && ((t = e.node.clientHeight < e.node.scrollHeight), null !== e.scrollbarState && t !== e.scrollbarState && e.callbackFn(), (e.scrollbarState = t), !0);
            }
            function i() {
                o.forEach(n);
            }
            (this.addWatcher = function (e, t) {
                var n;
                return angular.isFunction(e) && t instanceof Element
                    ? ((n = { callbackFn: e, node: t, scrollbarState: null }),
                      o.push(n),
                      1 === o.length && this.startWatch(),
                      function () {
                          o[o.indexOf(n)] = null;
                      })
                    : angular.noop;
            }),
                (this.startWatch = function () {
                    t = e.registerCallback(i);
                }),
                (this.stopWatch = t);
        },
    ]),
    angular.module("website").directive("motoSticky", [
        "$window",
        "$timeout",
        function (e, i) {
            var r,
                t = angular.element(e),
                d = { interval: 32, mobileClass: "moto-sticky__mobile", attachedClass: "moto-sticky__attached", bootstrappedClass: "moto-sticky__bootstrapped", pseudoElementClass: "moto-sticky-pseudo-element" },
                m = { hidden: !1, mobile: !1, offset: 0, mode: "dynamic", direction: "top" },
                g = [],
                a = !0,
                s = !0;
            function p() {
                return window.motoDebug || !1;
            }
            function l(e, o, i) {
                e.find(".moto-widget[data-sticky-preset]").each(function (e, t) {
                    var n = $(t);
                    n.removeClass("moto-preset-" + n.attr(o)), n.addClass("moto-preset-" + n.attr(i));
                });
            }
            function c(e) {
                return (
                    e.isAttached ||
                        (e.$element
                            .show()
                            .addClass(d.attachedClass)
                            .addClass(d.attachedClass + "_" + e.options.direction),
                        (e.isAttached = !0),
                        l(e.$element, "data-preset", "data-sticky-preset")),
                    (function (e) {
                        var t = 0;
                        try {
                            e.$pseudoElement.show(),
                                s || e.$element.innerWidth(e.$pseudoElement.innerWidth()),
                                e.options.hidden || e.$pseudoElement.height(e.$element.outerHeight(!0)),
                                s &&
                                    (e.$pseudoElement.hide(),
                                    e.$element
                                        .removeClass(d.attachedClass)
                                        .removeClass(d.attachedClass + "_" + e.options.direction)
                                        .css("width", "")
                                        .css("marginTop", ""),
                                    (t = e.$element.innerWidth()),
                                    e.$element.innerWidth(t),
                                    e.$pseudoElement.innerWidth(t),
                                    e.$pseudoElement.show(),
                                    e.$element.addClass(d.attachedClass).addClass(d.attachedClass + "_" + e.options.direction));
                        } catch (e) {
                            p() && console.info("motoSticky : ERROR on syncPseudoElement", e);
                        }
                    })(e),
                    !0
                );
            }
            function f(e) {
                try {
                    "static" === (t = e).options.mode ||
                    ((s = (i = t.isAttached || t.options.hidden ? t.$pseudoElement : t.$element).get(0).getBoundingClientRect()),
                    (r = !1),
                    (a = t.options.offset),
                    (n = parseInt(i.css("marginTop")) || 0),
                    "smallHeight" === t.options.mode ? ((o = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)), s.top + i.outerHeight() < o) : ("top" === t.options.direction && (r = s.top - n < a), r))
                        ? c(e)
                        : (function (e) {
                              if ((e.$pseudoElement.width(e.$element.innerWidth()), !e.isAttached)) return;
                              e.$element.css("width", ""),
                                  (e.isAttached = !1),
                                  e.$element.removeClass(d.attachedClass).removeClass(d.attachedClass + "_" + e.options.direction),
                                  e.options.hidden ? (e.$pseudoElement.height(0), e.$element.hide()) : e.$pseudoElement.hide(),
                                  l(e.$element, "data-sticky-preset", "data-preset");
                          })(e);
                } catch (e) {
                    p() && console.info("motoSticky : ERROR on checkObject", e);
                }
                var t, n, o, i, r, a, s;
            }
            function n(e) {
                "resize" === e.type && (s = !0), (a = !0);
            }
            function h() {
                a = s = !0;
            }
            function o(e, t, n) {
                var o,
                    i,
                    r,
                    a,
                    s,
                    l,
                    c = t.parents(".moto-popup_content"),
                    u = !!c.length;
                try {
                    if (0 < t.parent().closest("." + d.bootstrappedClass).length) return p() && console.log("motoSticky : DETECTED PARENTS");
                    (i = e.$eval(n.motoSticky)),
                        u &&
                            ((i.offset = 50),
                            (s = e),
                            (l = c).hasClass("moto-sticky__handlers-attached") ||
                                (l
                                    .addClass("moto-sticky__handlers-attached")
                                    .on("scroll", h)
                                    .on("lazybeforeunveil", ".lazyload", function (e) {
                                        $(e.target).one("load", h);
                                    }),
                                s.$on("$destroy", function () {
                                    l.off("scroll");
                                }))),
                        (o = { $scope: e, $element: t, $attrs: n, options: angular.extend({}, m, i), isAttached: !1 }),
                        i.mobile && t.addClass(d.mobileClass),
                        (a = o).$element.find(".lazyload").each(function (e, t) {
                            $(t).one("load", function () {
                                f(a);
                            });
                        }),
                        (r = o).$pseudoElement ||
                            ((r.$pseudoElement = angular.element('<div class="' + d.pseudoElementClass + '"></div>')),
                            r.$pseudoElement.insertAfter(r.$element),
                            r.options.hidden ? r.$pseudoElement.height(0) : (r.$pseudoElement.hide(), r.$pseudoElement.height(r.$element.outerHeight(!0)), r.$pseudoElement.width(r.$element.innerWidth()))),
                        f(o),
                        g.push(o);
                } catch (e) {
                    p() && console.info("motoSticky : ERROR on addObject", e);
                }
            }
            return (
                (function e(t) {
                    var n, o;
                    try {
                        if ((t || (r && i.cancel(r), (r = i(e, d.interval))), !a || g.length < 1)) return;
                        for (a = !1, o = 0, n = g.length; o < n; o++) f(g[o]);
                        s = !1;
                    } catch (e) {
                        p() && console.info("motoSticky : ERROR on checkObjects", e);
                    }
                })(),
                t.scroll(n).resize(n),
                {
                    restrict: "A",
                    compile: function (e) {
                        return e.addClass(d.bootstrappedClass), o;
                    },
                }
            );
        },
    ]),
    angular.module("website").service("website.MotoStorageService", [
        "$localStorage",
        "ipCookie",
        function (n) {
            var i = window.websiteConfig.addressHash + "_";
        
            this.getLocalStorageItem = function (e, t) {
                return localStorage.getItem(i + e) || (t || !1);
            };
        
            this.setLocalStorageItem = function (e, t) {
                return localStorage.setItem(i + e, t);
            };
        
            this.removeLocalStorageItem = function (e) {
                return localStorage.removeItem(i + e);
            };
        
           
            this.getCookie = this.getLocalStorageItem;
            this.setCookie = this.setLocalStorageItem;
            this.removeCookie = this.removeLocalStorageItem;
        }
        
    ]),
    angular.module("moto.validation").directive("motoClearValidationOnChange", function () {
        return {
            restrict: "A",
            require: "?ngModel",
            link: function (e, t, n, o) {
                var i, r, a;
                !(i = e.$eval(n.motoClearValidationOnChange)) && n.motoClearValidationOnChange && (i = n.motoClearValidationOnChange),
                    i && !angular.isArray(i) && (i = [i]),
                    o.$parsers.push(function (e) {
                        for (r = 0, a = i.length; r < a; r++) o.$setValidity(i[r], !0);
                        return e;
                    });
            },
        };
    }),
    angular.module("website").directive("body", [
        "$rootScope",
        "website.Entertainment",
        "website.WidgetsRepository",
        function (n, o, i) {
            return {
                restrict: "E",
                compile: function (e) {
                    var t = i.registry({ id: "body", name: "@body", $scope: n, $element: e });
                    return (
                        i.setDefaultParent(t),
                        {
                            post: function () {
                                i.setDefaultParent(null), o.letsDance(t);
                            },
                        }
                    );
                },
            };
        },
    ]),
    angular.module("website").filter("motoTruncateString", function () {
        return function (e, t, n) {
            return (n = n || "..."), (isNaN(t) || t < n.length + 1) && (t = 10), e.length > t && (e = e.substr(0, t - n.length) + n), e;
        };
    }),
    angular.module("website.backend.RenderService").service("Website.Backend.RenderService", [
        "jsonrpc",
        function (e) {
            var t = e.newService("Website.RenderService");
            this.render = t.createMethod("render");
        },
    ]),
    (function (e) {
        var i,
            n = !1,
            o = !1,
            r = 200,
            a = "motoResize",
            s = "motoDeviceChanged",
            l = { "mobile-v": "(max-width: 479px)", "mobile-h": "(min-width: 480px) and (max-width: 767px)", tablet: "(min-width: 768px) and (max-width: 1039px)", desktop: "(min-width: 1040px)" },
            c = ["desktop", "tablet", "mobile-h", "mobile-v"];
        function u() {
            var e, t;
            for (e = 0; e < c.length; e++) if (((t = l[c[e]]), window.matchMedia(t).matches)) return c[e];
            return "desktop";
        }
        function d(e) {
            return { originalEvent: e, width: window.innerWidth, height: window.innerHeight, device: i };
        }
        function m(e) {
            var t,
                n,
                o = u();
            i !== o && ((i = o), (t = e), window.dispatchEvent(new CustomEvent(s, { detail: d(t) }))), (n = e), window.dispatchEvent(new CustomEvent(a, { detail: d(n) }));
        }
        (i = u()),
            (e.fn.getCurrentMotoDevice = u),
            (e.fn.getMotoDevices = function () {
                return c;
            }),
            window.addEventListener("resize", function e(t) {
                n
                    ? (o = !0)
                    : (m(t),
                      (o = !(n = !0)),
                      setTimeout(function () {
                          (n = !1), o && e(t);
                      }, r));
            });
    })(jQuery),
    (function (s) {
        var l = "NOT_LOADED",
            c = "",
            u = "googleMapLoadedCallback_" + Date.now(),
            d = [];
        function m(e) {
            for (var t; d.length; ) (t = d.shift()), e ? t.deferred.reject(e) : t.deferred.resolve(t.instance());
        }
        function t(e) {
            return e;
        }
        function g(e) {
            return angular.isObject(e) && e.icon && (e.icon = t(e.icon, "marker.icon")), e;
        }
        "undefined" != typeof google && void 0 !== google.maps && (l = "LOADED"),
            (window[u] = function () {
                m(), delete window[u], (l = "LOADED");
            }),
            (s.fn.motoGoogleMap = function (e) {
                var t,
                    n,
                    o = s.Deferred(),
                    i = this[0],
                    r = {
                        standard: [],
                        silver: [
                            { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
                            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                            { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
                            { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
                            { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
                            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
                            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
                            { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
                            { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
                            { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
                            { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
                            { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
                            { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
                            { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
                            { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
                            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
                        ],
                        retro: [
                            { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
                            { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
                            { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
                            { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#c9b2a6" }] },
                            { featureType: "administrative.land_parcel", elementType: "geometry.stroke", stylers: [{ color: "#dcd2be" }] },
                            { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#ae9e90" }] },
                            { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
                            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
                            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#93817c" }] },
                            { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#a5b076" }] },
                            { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#447530" }] },
                            { featureType: "road", elementType: "geometry", stylers: [{ color: "#f5f1e6" }] },
                            { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#fdfcf8" }] },
                            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#f8c967" }] },
                            { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#e9bc62" }] },
                            { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#e98d58" }] },
                            { featureType: "road.highway.controlled_access", elementType: "geometry.stroke", stylers: [{ color: "#db8555" }] },
                            { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#806b63" }] },
                            { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
                            { featureType: "transit.line", elementType: "labels.text.fill", stylers: [{ color: "#8f7d77" }] },
                            { featureType: "transit.line", elementType: "labels.text.stroke", stylers: [{ color: "#ebe3cd" }] },
                            { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#dfd2ae" }] },
                            { featureType: "water", elementType: "geometry.fill", stylers: [{ color: "#b9d3c2" }] },
                            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#92998d" }] },
                        ],
                        dark: [
                            { elementType: "geometry", stylers: [{ color: "#212121" }] },
                            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
                            { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                            { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
                            { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
                            { featureType: "administrative.country", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
                            { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
                            { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
                            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#181818" }] },
                            { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
                            { featureType: "poi.park", elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1b" }] },
                            { featureType: "road", elementType: "geometry.fill", stylers: [{ color: "#2c2c2c" }] },
                            { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
                            { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#373737" }] },
                            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3c3c3c" }] },
                            { featureType: "road.highway.controlled_access", elementType: "geometry", stylers: [{ color: "#4e4e4e" }] },
                            { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
                            { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
                            { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
                            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#3d3d3d" }] },
                        ],
                        night: [
                            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                            { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
                            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
                            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#263c3f" }] },
                            { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#6b9a76" }] },
                            { featureType: "road", elementType: "geometry", stylers: [{ color: "#38414e" }] },
                            { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a37" }] },
                            { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9ca5b3" }] },
                            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#746855" }] },
                            { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1f2835" }] },
                            { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#f3d19c" }] },
                            { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
                            { featureType: "transit.station", elementType: "labels.text.fill", stylers: [{ color: "#d59563" }] },
                            { featureType: "water", elementType: "geometry", stylers: [{ color: "#17263c" }] },
                            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#515c6d" }] },
                            { featureType: "water", elementType: "labels.text.stroke", stylers: [{ color: "#17263c" }] },
                        ],
                        aubergine: [
                            { elementType: "geometry", stylers: [{ color: "#1d2c4d" }] },
                            { elementType: "labels.text.fill", stylers: [{ color: "#8ec3b9" }] },
                            { elementType: "labels.text.stroke", stylers: [{ color: "#1a3646" }] },
                            { featureType: "administrative.country", elementType: "geometry.stroke", stylers: [{ color: "#4b6878" }] },
                            { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#64779e" }] },
                            { featureType: "administrative.province", elementType: "geometry.stroke", stylers: [{ color: "#4b6878" }] },
                            { featureType: "landscape.man_made", elementType: "geometry.stroke", stylers: [{ color: "#334e87" }] },
                            { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#023e58" }] },
                            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#283d6a" }] },
                            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#6f9ba5" }] },
                            { featureType: "poi", elementType: "labels.text.stroke", stylers: [{ color: "#1d2c4d" }] },
                            { featureType: "poi.park", elementType: "geometry.fill", stylers: [{ color: "#023e58" }] },
                            { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#3C7680" }] },
                            { featureType: "road", elementType: "geometry", stylers: [{ color: "#304a7d" }] },
                            { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#98a5be" }] },
                            { featureType: "road", elementType: "labels.text.stroke", stylers: [{ color: "#1d2c4d" }] },
                            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#2c6675" }] },
                            { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#255763" }] },
                            { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#b0d5ce" }] },
                            { featureType: "road.highway", elementType: "labels.text.stroke", stylers: [{ color: "#023e58" }] },
                            { featureType: "transit", elementType: "labels.text.fill", stylers: [{ color: "#98a5be" }] },
                            { featureType: "transit", elementType: "labels.text.stroke", stylers: [{ color: "#1d2c4d" }] },
                            { featureType: "transit.line", elementType: "geometry.fill", stylers: [{ color: "#283d6a" }] },
                            { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#3a4762" }] },
                            { featureType: "water", elementType: "geometry", stylers: [{ color: "#0e1626" }] },
                            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#4e6d70" }] },
                        ],
                    };
                function a(e) {
                    (this.items = []), (this.map = e), (this.withInfowWindow = !0);
                }
                return (
                    (a.prototype.add = function (e) {
                        var t, n;
                        return (
                            Array.isArray(e)
                                ? angular.forEach(e, this.add.bind(this))
                                : ((n = s.extend(!0, {}, e)),
                                  e instanceof google.maps.Marker || (e = new google.maps.Marker(e)),
                                  g(e),
                                  e.setMap(this.map),
                                  this.items.push(e),
                                  this.withInfowWindow
                                      ? this.setInfoWindow(e)
                                      : (google.maps.event.addListener(
                                            e,
                                            "click",
                                            function () {
                                                (t = this.items.indexOf(e)), s(document).trigger("motoGoogleMap:markerClick", [n, t]);
                                            }.bind(this)
                                        ),
                                        google.maps.event.addListener(
                                            e,
                                            "dragend",
                                            function () {
                                                s(document).trigger("motoGoogleMap:markerDragend", e.getPosition());
                                            }.bind(this)
                                        ))),
                            this
                        );
                    }),
                    (a.prototype.update = function (t) {
                        var n,
                            e = this.getByUid(t.uid);
                        if (!angular.isObject(t)) return !1;
                        for (n in (g((t = angular.copy(t))), t))
                            if (t.hasOwnProperty(n) && "_" !== n[0] && "$" !== n[0] && "function" != typeof t[n])
                                try {
                                    "position" === n ? e.setPosition(t[n]) : e.set(n, t[n]);
                                } catch (e) {
                                    console.warn("UpdateMarker : error on set property value ", n, t[n]);
                                }
                        return !0;
                    }),
                    (a.prototype.delete = function (e) {
                        var t;
                        (e = this.getByUid(e.uid)) && (e.setMap(null), -1 < (t = this.items.indexOf(e)) && this.items.splice(t, 1));
                    }),
                    (a.prototype.clearAll = function () {
                        this.items.forEach(function (e) {
                            e.setMap(null);
                        }),
                            (this.items = []);
                    }),
                    (a.prototype.getItems = function () {
                        return this.items;
                    }),
                    (a.prototype.showOnly = function (e) {
                        var t, n;
                        for (t = 0, n = this.items.length; t < n; t++) this.items[t].get("uid") !== e.uid ? this.items[t].setVisible(!1) : this.items[t].setDraggable(!0);
                    }),
                    (a.prototype.setInfoWindow = function (e) {
                        var t;
                        e.caption &&
                            e.caption.length &&
                            ((t = new google.maps.InfoWindow()).setContent('<div class="moto-widget-text">' + e.caption + "</div>"),
                            e.showInfoByDefault && t.open(this.map, e),
                            e.addListener(
                                "click",
                                function () {
                                    t.open(this.map, e);
                                }.bind(this)
                            ));
                    }),
                    (a.prototype.getByUid = function (e) {
                        var t, n;
                        for (t = 0, n = this.items.length; t < n; t++) if (this.items[t].get("uid") === e) return this.items[t];
                        return null;
                    }),
                    d.push({
                        deferred: o,
                        instance: function () {
                            return (
                                (e.styles = r[e.theme]),
                                {
                                    getMap: function () {
                                        return t;
                                    },
                                    setZoom: function (e) {
                                        t.setZoom(e);
                                    },
                                    getZoom: function () {
                                        return t.getZoom();
                                    },
                                    setCenter: function (e) {
                                        return t.setCenter(e);
                                    },
                                    getCenter: function () {
                                        return { lat: t.getCenter().lat(), lng: t.getCenter().lng() };
                                    },
                                    _markers: new a((t = new google.maps.Map(i, e))),
                                    addMarker: function (e) {
                                        this._markers.add(e);
                                    },
                                    deleteMarker: function (e) {
                                        this._markers.delete(e);
                                    },
                                    showOnlyMarker: function (e) {
                                        this._markers.showOnly(e);
                                    },
                                    updateMarker: function (e) {
                                        this._markers.update(e);
                                    },
                                    clearAllMarkers: function () {
                                        this._markers.clearAll();
                                    },
                                }
                            );
                        },
                    }),
                    "LOADED" === l
                        ? m()
                        : "LOADING" !== l &&
                          ((l = "LOADING"),
                          ((n = document.createElement("script")).type = "text/javascript"),
                          (n.src = "https://maps.googleapis.com/maps/api/js?key=" + c + "&callback=" + u),
                          (n.defer = !0),
                          (n.onerror = function () {
                              m("Google Map SDK not loaded!");
                          }),
                          document.body.appendChild(n)),
                    o.promise()
                );
            }),
            (s.fn.motoGoogleMap.setUrlResolveHandler = function (e) {
                return !!angular.isFunction(e) && ((t = e), !0);
            }),
            (s.fn.motoGoogleMap.isSdkInjected = function () {
                return "NOT_LOADED" !== l && "LOADING" !== l;
            }),
            (s.fn.motoGoogleMap.isSdkReady = function () {
                return "LOADED" === l;
            }),
            (s.fn.motoGoogleMap.setApiKey = function (e) {
                if ("string" != typeof e) throw new Error("[motoGoogleMap.setApiKey] Bad argument: ApiKey must be a string, got " + _typeof(e));
                return !s.fn.motoGoogleMap.isSdkInjected() && ((c = e), !0);
            });
    })(jQuery),
    angular.module("common.elements.Paginator", []).service("common.elements.PaginatorClass", [
        function () {
            function a(e, t) {
                (this.value = e), (this.number = angular.isNumber(t) ? t : null), angular.isObject(e) && angular.isDefined(e.number) && (this.number = e.number);
            }
            function e() {
                (this._events = {}), this.reset();
            }
            return (
                (a.prototype = {
                    value: null,
                    number: null,
                    toString: function () {
                        return this.number;
                    },
                    getLink: function () {
                        return this.value && this.value.link;
                    },
                }),
                (e.prototype = {
                    pageRange: 5,
                    pageCount: 0,
                    currentNumber: 1,
                    firstNumber: null,
                    previousNumber: null,
                    nextNumber: null,
                    lastNumber: null,
                    pages: [],
                    pagesInRange: [],
                    _events: {},
                    $on: function (e, t) {
                        return !(!angular.isString(e) || !angular.isFunction(t)) && ((this._events[e] = this._events[e] || []), this._events[e].push(t), !0);
                    },
                    $trigger: function (e, t) {
                        var n,
                            o,
                            i = { name: e };
                        if (!this._events[e]) return !1;
                        for (n = 0, o = this._events[e].length; n < o; n++) this._events[e][n](i, t);
                    },
                    reset: function () {
                        (this.pageRange = 5),
                            (this.pageCount = 0),
                            (this.first = null),
                            (this.firstNumber = 0),
                            (this.previous = null),
                            (this.previousNumber = null),
                            (this.current = null),
                            (this.currentNumber = 0),
                            (this.next = null),
                            (this.nextNumber = null),
                            (this.last = null),
                            (this.lastNumber = null),
                            (this.pages = []),
                            (this.pagesInRange = []);
                    },
                    setPageRange: function (e) {
                        return (e = parseInt(e)), !(isNaN(e) || e < 1) && ((this.pageRange = e), this.updatePagesInRange(), !0);
                    },
                    updatePagesInRange: function () {
                        var e,
                            t = Math.min(this.pageCount, this.pages.length),
                            n = Math.round(this.currentNumber - this.pageRange / 2) - 1;
                        for (
                            t - n < this.pageRange && (n -= this.pageRange - (t - n)), n < 0 && (n = 0), this.pagesInRange.length = 0, e = n;
                            e < t && (this.pagesInRange.push(this.pages[e]), !(this.pagesInRange.length >= this.pageRange));
                            e++
                        );
                    },
                    isDataExists: function () {
                        return !!this.pages.length;
                    },
                    setData: function (e) {
                        return (
                            this.reset(),
                            !(angular.isArray(e) || !angular.isObject(e)) &&
                                ((this.pages = (function (e) {
                                    var t,
                                        n,
                                        o,
                                        i,
                                        r = [];
                                    for (t = 0, n = e.length; t < n; t++) r.push(((o = e[t]), (i = t + 1), o instanceof a ? o : new a(o, i)));
                                    return r;
                                })(e.pages)),
                                (this.pageCount = e.pages.length),
                                (this.firstNumber = 1),
                                (this.first = this.getFirstPage() || new a(null, 1)),
                                (this.last = this.getLastPage() || new a(null, this.pageCount + 1)),
                                (this.lastNumber = this.last.number),
                                this.setCurrentPageNumber(e.current),
                                !0)
                        );
                    },
                    getPageByNumber: function (e) {
                        return this.pages[e - 1];
                    },
                    getFirstPage: function () {
                        return this.pages[0];
                    },
                    getPreviousPage: function () {
                        return this.getPageByNumber(this.currentNumber - 1);
                    },
                    getCurrentPage: function () {
                        return this.getPageByNumber(this.currentNumber);
                    },
                    getNextPage: function () {
                        return this.getPageByNumber(this.currentNumber + 1);
                    },
                    getLastPage: function () {
                        return this.pages[this.pages.length - 1];
                    },
                    setCurrentPageNumber: function (e) {
                        return (
                            (e = parseInt(e)),
                            !isNaN(e) &&
                                (1 < (this.currentNumber = e) && (this.previousNumber = e - 1),
                                e < this.pages.length && (this.nextNumber = e + 1),
                                (this.previous = this.getPreviousPage() || new a(null, this.previousNumber)),
                                (this.current = this.getCurrentPage() || new a(null, this.currentNumber)),
                                (this.next = this.getNextPage() || new a(null, this.nextNumber)),
                                this.updatePagesInRange(),
                                !0)
                        );
                    },
                    selectPage: function (e) {
                        angular.isNumber(e) && (e = this.getPageByNumber(e)), e instanceof a && this.$trigger("selected", e.value);
                    },
                }),
                e
            );
        },
    ]),
    angular.module("website.widget.advanced_image", ["website.core"]).directive("motoWidgetAdvancedImagePicture", [
        "website.Entertainment",
        function (o) {
            return {
                restrict: "AC",
                link: function (e, t) {
                    var n = { $scope: e, $element: t };
                    o.$onLetsDanceEvent(n, function () {
                        t.motoAbsolutePositionCover(t.find(".moto-widget-advanced-image__picture-element"));
                    });
                },
            };
        },
    ]),
    angular.module("website.widget.audio_player", ["website.core"]).directive("motoWidgetAudioPlayer", [
        "website.MediaService",
        "$q",
        "website.Entertainment",
        function (p, f, h) {
            return {
                restrict: "AC",
                link: function (e, t, n) {
                    var o,
                        i,
                        r,
                        a,
                        s,
                        l,
                        c = t.find(".moto-media-player-container").data("buttons"),
                        u = !1,
                        d = !0,
                        m = { $scope: e, $element: t },
                        g = e.$eval(n.autoplaySettings);
                    angular.isObject(g) && (o = { enabled: !0, allowed: h.isEnabledPlaying(t), forced: g.forced, startOn: g.onlyWhenVisible ? "onFirstVisible" : "default" }),
                        (a = t.find("audio")),
                        (s = t.find("source")),
                        (l = void 0 !== a.attr("data-showplaylist")),
                        (i = p.registerItem({
                            node: t,
                            scope: e,
                            ready: !1,
                            autoplay: o,
                            pause: function () {
                                (u = !1), a.off("canplay"), (d = !0), r.pause();
                            },
                            play: function () {
                                function e() {
                                    f.when(r.domNode.play())
                                        .then(function () {
                                            d ? r.domNode.pause() : r.domNode.play();
                                        })
                                        .catch(function () {
                                            (d = !0), p.autoplayFailed();
                                        });
                                }
                                (d = !1),
                                    4 === r.readyState
                                        ? e()
                                        : ((u = !0),
                                          a.one("canplay", function () {
                                              (u = !1), e();
                                          }));
                            },
                            isPlaying: function () {
                                return !r.paused || (!d && u);
                            },
                        })),
                        a.mediaelementplayer({
                            classPrefix: "mejs-",
                            setDimensions: !1,
                            alwaysShowControls: !0,
                            motoTrackName: s.attr("title") || "",
                            loop: !l && a.attr("data-loop"),
                            timeAndDurationSeparator: "<span>/</span>",
                            startVolume: 1,
                            playText: "",
                            pauseText: "",
                            stopText: "",
                            nextText: "",
                            prevText: "",
                            playlistText: "",
                            showPlaylist: !!a.attr("data-showplaylist"),
                            features: [
                                l ? "playlistfeature" : "",
                                l ? "prevtrack" : "",
                                "playpause",
                                l ? "nexttrack" : "",
                                c && c.stop ? "stop" : "",
                                "progress",
                                "current",
                                "duration",
                                "mototrackname",
                                "volume",
                                l ? "playlist" : "",
                                c && c.loop ? "motoloop" : "",
                                c && c.download ? "motodownload" : "",
                                "motoskin",
                            ],
                            plugins: [],
                            success: function (e, t, n) {
                                (r = n), p.itemReady(i);
                            },
                        }),
                        h.$onLetsDanceEvent(m, function () {
                            (i.autoplay.allowed = h.isEnabledPlaying(t)), p.checkAndAutoplayItem(i);
                        }),
                        h.$onLetsStopEvent(m, function () {
                            (i.autoplay.allowed = !1), i.pause();
                        });
                },
            };
        },
    ]),
    angular
        .module("website.widget.auth_form", ["core.library.jsonrpc"])
        .service("widget.AuthForm.Service", [
            "jsonrpc",
            function (e) {
                var t = e.newService("AuthService");
                this.loginToPageByPassword = t.createMethod("loginToPageByPassword");
            },
        ])
        .directive("motoWidgetAuthForm", [
            "widget.AuthForm.Service",
            "$window",
            function (o, i) {
                return {
                    restrict: "C",
                    scope: !0,
                    link: function (t, e, n) {
                        (t.request = { password: "", pageId: n.destinationPageId }),
                            (t.submit = function () {
                                t.request.pageId &&
                                    (t.authForm.password.$setTouched(),
                                    t.authForm.$valid &&
                                        o.loginToPageByPassword(t.request).then(
                                            function () {
                                                i.location.reload();
                                            },
                                            function (e) {
                                                e && "403" == e.code ? t.authForm.password.$setValidity("passwordInvalid", !1) : t.authForm.password.$setValidity("couldNotSend", !1);
                                            }
                                        ));
                            });
                    },
                };
            },
        ]),
    angular.module("website.widget.carousel", []).directive("motoCarouselOptions", [
        "$timeout",
        "website.Entertainment",
        function (l, c) {
            return {
                restrict: "A",
                priority: 450,
                link: function (e, t, n) {
                    var o,
                        i,
                        r = { $scope: e, $element: t },
                        a = e.$eval(n.motoCarouselOptions),
                        s =
                            ((o = a).itemsCount < 2 && (o.showPaginationDots = !1),
                            {
                                mode: "horizontal",
                                auto: !1,
                                pause: 1e3 * o.slideshowDelay,
                                controls: o.showNextPrev,
                                pager: o.showPaginationDots,
                                slideWidth: o.slideWidth,
                                minSlides: o.minSlides,
                                maxSlides: o.maxSlides,
                                moveSlides: o.moveSlides,
                                slideMargin: o.margins,
                                stopAutoOnClick: !0,
                                shrinkItems: !0,
                            });
                    (s.onSliderLoad = function () {
                        t.closest(".moto-widget-carousel").removeClass("moto-widget-carousel-loader");
                    }),
                        s.controls &&
                            s.pager &&
                            (s.onSliderResize = function (e) {
                                var t, n;
                                if ((angular.isElement(e) || (e = this), !angular.isElement(e))) return !1;
                                try {
                                    (t = e.parent().parent()),
                                        1 < (n = $(t.find("> .bx-controls")[0])).find(".bx-pager > .bx-pager-item").length
                                            ? n.find(".bx-controls-direction > a").removeClass("disabled")
                                            : n.find(".bx-controls-direction > a").addClass("disabled");
                                } catch (e) {}
                                return !0;
                            }.bind(t)),
                        (i = t.bxSlider(s)),
                        e.$on("$destroy", i.destroySlider),
                        c.$onLetsDanceEvent(r, function () {
                            i.reloadSlider(angular.extend({}, s, { startSlide: i.getCurrentSlide() })), c.isDisabledPlaying(t) || (a.slideshowEnabled && i.startAuto(), l(i.redrawSlider));
                        }),
                        c.$onLetsStopEvent(r, function () {
                            i.stopAuto();
                        });
                },
            };
        },
    ]),
    angular.module("website.widget.completion_bar_circular", ["website"]).directive("motoWidgetCompletionBarCircular", [
        "motoBeforeInViewport",
        function (n) {
            return {
                restrict: "C",
                scope: { options: "<motoCompletionBarCircularOptions" },
                link: function (e, t) {
                    (e.options.progress.animation || e.options.progressBar.animation) &&
                        n.startWatching({
                            element: t,
                            onEnter: function () {
                                e.options.progress.animation &&
                                    t.motoCounter({
                                        countTo: e.options.progress.custom ? e.options.progress.customValue : e.options.progress.value,
                                        duration: e.options.progress.animationDuration,
                                        elementSelector: ".moto-widget-completion_bar_circular__progress-value",
                                    }),
                                    e.options.progressBar.animation && t.find(".moto-widget-completion_bar_circular__svg").get(0).classList.add("moto-widget-completion_bar_circular__svg-animated");
                            },
                        });
                },
            };
        },
    ]),
    angular
        .module("website.widget.contact_form", ["core.library.jsonrpc", "ngFileUpload"])
        .service("widget.ContactForm.Service", [
            "jsonrpc",
            function (e) {
                var t = e.newService("Widget.ContactForm");
                (this.sendMessage = t.createMethod("sendMessage")), (this.getApiPath = e.getBasePath);
            },
        ])
        .directive("motoWidgetContactForm", [
            "$timeout",
            function (i) {
                return {
                    restrict: "C",
                    scope: !0,
                    compile: function (o) {
                        return {
                            pre: function (e) {
                                function t() {
                                    e.$emit("UserInteraction", "StartInteraction");
                                }
                                function n() {
                                    i(t);
                                }
                                o.closest(".moto-widget_interactive").length < 1 ||
                                    (o.on("click", t),
                                    o.on("focus", "input, select, textarea, button, a", n),
                                    e.$on("$destroy", function () {
                                        o.off("click", t), o.off("focus", n);
                                    }));
                            },
                        };
                    },
                };
            },
        ])
        .controller("widget.ContactForm.Controller", [
            "$scope",
            "$element",
            "widget.ContactForm.Service",
            "Upload",
            "website.MotoLinkActionService",
            "website.BrowserTabClosingConfirmation",
            function (n, e, t, o, i, r) {
                var a,
                    s,
                    l,
                    c,
                    u,
                    d,
                    m = e.find("input, textarea"),
                    g = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z0-9-]+)$/;
                if (((n.message = {}), (n.placeholder = {}), (n.hash = ""), (n.attachments = []), (n.attachment = {}), m.length))
                    for (u = 0, d = m.length; u < d; u++)
                        (l = (s = angular.element(m[u])).attr("name")) &&
                            ((n.message[l] = n.message[l] || ""), (n.placeholder[l] = "checkbox" === l ? e.find(".moto-widget-contact_form-checkbox-text").text() || l : s.attr("placeholder") || l));
                function p() {
                    (n.emailError = !0), (n.sending = !1), r.disable(a);
                }
                function f(e) {
                    if (e.error) return p(e.error);
                    (n.emailSent = !0),
                        (n.triedToSend = !1),
                        (n.sending = !1),
                        n.resetAfterSubmission &&
                            (angular.forEach(n.message, function (e, t) {
                                n.message[t] = "";
                            }),
                            n.contactForm.$setPristine(),
                            n.contactForm.$setUntouched()),
                        r.disable(a),
                        angular.isObject(n.actionAfterSubmission) && "none" !== n.actionAfterSubmission.action ? i.execute(n.actionAfterSubmission) : (n.showSuccessMessage = !0);
                }
                (n.validateEmailOnBlur = function () {
                    (n.contactForm.email.$pristine = !1),
                        "" !== n.contactForm.email.$viewValue
                            ? g.test(n.contactForm.email.$viewValue)
                                ? ((n.contactForm.email.emailInvalid = !1), n.contactForm.email.$setValidity("pattern", !0))
                                : ((n.contactForm.email.emailInvalid = !0), n.contactForm.email.$setValidity("pattern", !1))
                            : (n.contactForm.email.emailInvalid = !1);
                }),
                    (n.validate = function (e) {
                        "email" === e && n.validateEmailOnBlur();
                    }),
                    (n.validateCheckbox = function () {
                        c &&
                            ((n.contactForm.checkbox.$pristine = !1),
                            n.contactForm.checkbox.$viewValue
                                ? ((n.contactForm.checkbox.$invalid = !1), n.contactForm.checkbox.$setValidity("required", !0))
                                : ((n.contactForm.checkbox.$invalid = !0), n.contactForm.checkbox.$setValidity("required", !1), (n.contactForm.$valid = !1)));
                    }),
                    (n.checkboxChanged = function () {
                        n.contactForm.checkbox.$invalid && n.validateCheckbox();
                    }),
                    (n.requiredCheckbox = function () {
                        c = !0;
                    }),
                    (n.errors = []),
                    (n.emailSent = !1),
                    (n.showSuccessMessage = !1),
                    (n.triedToSend = !1),
                    (n.submit = function () {
                        n.sending ||
                            ((n.emailSent = !1),
                            (n.showSuccessMessage = !1),
                            (n.triedToSend = !0),
                            (n.errors = []),
                            (n.sending = !0),
                            (n.emailError = !1),
                            "object" === _typeof(n.contactForm.$error.required)
                                ? (n.contactForm.$error.required.forEach(function (e) {
                                      (e.$dirty = !0), (e.$pristine = !1), e.$setTouched();
                                  }),
                                  (n.contactForm.$valid = !1))
                                : (n.contactForm.$valid = !0),
                            n.contactForm.email && n.validate("email"),
                            n.contactForm.checkbox && n.validateCheckbox(),
                            n.contactForm && n.contactForm.$valid
                                ? ((a = "widget.ContactForm_" + new Date().getTime()),
                                  r.enable(a),
                                  n.attachment && n.attachment.name
                                      ? ((n.message._attachments = n.attachment.name ? 1 : 0),
                                        o
                                            .upload({
                                                method: "POST",
                                                url: t.getApiPath(),
                                                file: n.attachment,
                                                data: { jsonrpc: "2.0", id: 1, method: "Widget.ContactForm.sendMessage", params: { message: n.message, placeholder: n.placeholder, hash: n.hash } },
                                                headers: { "X-Requested-With": "XMLHttpRequest" },
                                            })
                                            .success(f)
                                            .error(p))
                                      : t.sendMessage({ message: n.message, placeholder: n.placeholder, hash: n.hash }).success(f).error(p))
                                : (n.sending = !1));
                    });
            },
        ]),
    angular.module("website.widget.countdown", ["timer", "website.core.humanize_duration"]).directive("motoWidgetCountdown", [
        "$window",
        function (a) {
            return {
                restrict: "C",
                scope: !0,
                compile: function (e, m) {
                    var t,
                        n,
                        o,
                        i = e.children("timer"),
                        r = e.find(".countdown-item-amount"),
                        g = parseFloat(m.time),
                        p = new Date().getTime();
                    function f() {
                        "hide" === m.onExpiry ? e.slideUp() : "redirect" === m.onExpiry && m.redirectUrl && (a.location.href = m.redirectUrl);
                    }
                    for (o = 0; o < r.length; o++)
                        (n = (t = angular.element(r[o])).attr("data-ng-bind")), 0 === o && i.attr("max-time-unit", "'" + n.slice(0, -1) + "'"), 0 <= ["hours", "minutes", "seconds"].indexOf(n) && t.attr("data-ng-bind", n[0] + n);
                    return {
                        pre: function (e) {
                            var t, n, o, i, r, a, s, l, c, u, d;
                            "event" === m.type
                                ? (e.countdownTime =
                                      ((t = g),
                                      (n = parseFloat(m.timezone)),
                                      (u = new Date()).setTime(t),
                                      (c = u.getMilliseconds()),
                                      (l = u.getSeconds()),
                                      (s = u.getMinutes()),
                                      (a = u.getHours()),
                                      (r = u.getDate()),
                                      (i = u.getMonth()),
                                      (o = u.getFullYear()),
                                      (d = new Date()).setUTCFullYear(o),
                                      d.setUTCDate(1),
                                      d.setUTCMonth(i || 0),
                                      d.setUTCDate(r || 1),
                                      d.setUTCHours(a || 0),
                                      d.setUTCMinutes((s || 0) - (Math.abs(n) < 30 ? 60 * n : n)),
                                      d.setUTCSeconds(l || 0),
                                      d.setUTCMilliseconds(c || 0),
                                      (d.getTime() - p) / 1e3))
                                : (e.countdownTime = g / 1e3),
                                (!e.countdownTime || isNaN(e.countdownTime) || e.countdownTime < 0) && (e.countdownTime = 0),
                                m.onExpiry && "stop" !== m.onExpiry && e.$on("timer-stopped", f);
                        },
                    };
                },
            };
        },
    ]),
    angular.module("website.widget.counter", ["website"]).directive("motoWidgetCounter", [
        "motoBeforeInViewport",
        function (n) {
            return {
                restrict: "C",
                scope: { options: "<motoCounterOptions" },
                link: function (e, t) {
                    n.startWatching({
                        element: t,
                        onEnter: function () {
                            t.motoCounter(e.options);
                        },
                    });
                },
            };
        },
    ]),
    angular.module("website.widget.disqus", ["website.core"]).directive("motoWidgetDisqus", [
        "motoDependencyService",
        function (i) {
            var r = !1;
            return {
                restrict: "AC",
                link: function (e, t, n) {
                    var o;
                    try {
                        if (r) return t.remove();
                        (r = !0),
                            (o = n.params || {}),
                            angular.isString(o) && (o = angular.fromJson(o)),
                            (o.url = n.url),
                            (window.disqus_config = function () {
                                this.language = o.language;
                            }),
                            o.use_identifier ? delete o.url : delete o.identifier,
                            delete o.use_identifier,
                            o && o.shortname && "" != o.shortname && i.get("disqus").setParams(o).require();
                    } catch (e) {}
                },
            };
        },
    ]),
    angular
        .module("website.widget.facebook_page_plugin", ["website.core"])
        .config([
            "motoWebsiteSettingsServiceProvider",
            "motoDependencyServiceProvider",
            function (e, t) {
                try {
                    t.get("facebook").setLanguage(e.get("preferredLocale", "en_US"));
                } catch (e) {}
            },
        ])
        .directive("motoWidgetFacebookPagePlugin", [
            "motoDependencyService",
            function (e) {
                return {
                    restrict: "AC",
                    link: function () {
                        try {
                            e.require("facebook");
                        } catch (e) {}
                    },
                };
            },
        ]),
    angular.module("website.widget.google_map_pro", []).directive("motoWidgetGoogleMapProWrapper", [
        function () {
            return {
                restrict: "C",
                link: function (e, t, n) {
                    t.motoGoogleMap(JSON.parse(n.mapProperties)).then(function (e) {
                        e.addMarker(JSON.parse(n.mapMarkers));
                    });
                },
            };
        },
    ]),
    angular.module("website.widget.grid_gallery", []).directive("motoGridGalleryOptions", function () {
        return {
            restrict: "A",
            priority: 450,
            link: function (e, t, n) {
                var o = e.$eval(n.motoGridGalleryOptions);
                t.justifiedGallery({ rowHeight: o.rowHeight, maxRowHeight: o.fixedHeight ? o.rowHeight : 0, margins: o.margins, lastRow: o.lastRow, captions: o.showCaptions, cssAnimation: !0 });
            },
        };
    }),
    angular.module("website.widget.instagram.post", ["website.core"]).directive("motoWidgetInstagramPost", [
        "motoDependencyService",
        function (e) {
            return {
                restrict: "C",
                link: function () {
                    try {
                        e.require("instagram_post");
                    } catch (e) {}
                },
            };
        },
    ]),
    angular
        .module("website.widget.mail_chimp", ["core.library.jsonrpc"])
        .service("website.widget.MailChimpService", [
            "jsonrpc",
            function (e) {
                var t = e.newService("Widget.MailChimp");
                this.subscribe = t.createMethod("subscribe");
            },
        ])
        .controller("widget.MailChimp.Controller", [
            "$scope",
            "$element",
            "website.widget.MailChimpService",
            "website.MotoLinkActionService",
            "website.BrowserTabClosingConfirmation",
            function (n, e, t, o, i) {
                var r,
                    a,
                    s,
                    l,
                    c,
                    u = e.find("input"),
                    d = /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z0-9-]+)$/,
                    m = u.length;
                if (((n.listId = ""), (n.message = {}), (n.emailSent = !1), (n.showSuccessMessage = !1), (n.triedToSend = !1), (n.emailError = !1), (n.isSubscribed = !1), m))
                    for (l = 0; l < m; l++) (s = (a = angular.element(u[l])).attr("name")) && (n.message[s] = n.message[s] || a.attr("value") || "");
                function g() {
                    (n.emailSent = !0),
                        (n.triedToSend = !1),
                        (n.sending = !1),
                        n.resetAfterSubmission &&
                            (angular.forEach(n.message, function (e, t) {
                                n.message[t] = "";
                            }),
                            n.subscribeForm.$setPristine(),
                            n.subscribeForm.$setUntouched()),
                        i.disable(r),
                        angular.isObject(n.actionAfterSubmission) && "none" !== n.actionAfterSubmission.action ? o.execute(n.actionAfterSubmission) : (n.showSuccessMessage = !0);
                }
                function p(e) {
                    (n.emailError = !0), (n.sending = !1), i.disable(r), e.data && e.data.errors && e.data.errors.detail && (n.isSubscribed = e.data.errors.detail.match(/is already a list member/g));
                }
                (n.validateEmailOnBlur = function () {
                    (n.subscribeForm.email.$pristine = !1),
                        "" != n.subscribeForm.email.$viewValue
                            ? d.test(n.subscribeForm.email.$viewValue)
                                ? ((n.subscribeForm.email.emailInvalid = !1), n.subscribeForm.email.$setValidity("pattern", !0))
                                : ((n.subscribeForm.email.emailInvalid = !0), n.subscribeForm.email.$setValidity("pattern", !1))
                            : (n.subscribeForm.email.emailInvalid = !1);
                }),
                    (n.validateRequiredOnBlur = function (e) {
                        (n.subscribeForm[e].$pristine = !1), "" == n.subscribeForm[e].$viewValue ? ((n.subscribeForm[e].$invalid = !0), (n.subscribeForm.$valid = !1)) : (n.subscribeForm[e].$invalid = !1);
                    }),
                    (n.validate = function (e) {
                        "email" == e && n.validateEmailOnBlur(), n.validateRequiredOnBlur(e);
                    }),
                    (n.validateCheckbox = function () {
                        c &&
                            ((n.subscribeForm.checkbox.$pristine = !1),
                            n.subscribeForm.checkbox.$viewValue
                                ? ((n.subscribeForm.checkbox.$invalid = !1), n.subscribeForm.checkbox.$setValidity("required", !0))
                                : ((n.subscribeForm.checkbox.$invalid = !0), n.subscribeForm.checkbox.$setValidity("required", !1), (n.subscribeForm.$valid = !1)));
                    }),
                    (n.checkboxChanged = function () {
                        n.subscribeForm.checkbox.$invalid && n.validateCheckbox();
                    }),
                    (n.requiredCheckbox = function () {
                        c = !0;
                    }),
                    (n.submit = function () {
                        n.sending ||
                            ((n.emailSent = !1),
                            (n.showSuccessMessage = !1),
                            (n.triedToSend = !0),
                            (n.sending = !0),
                            (n.emailError = !1),
                            (n.isSubscribed = !1),
                            "object" == _typeof(n.subscribeForm.$error.required)
                                ? (n.subscribeForm.$error.required.forEach(function (e) {
                                      (e.$dirty = !0), (e.$pristine = !1), e.$setTouched();
                                  }),
                                  (n.subscribeForm.$valid = !1))
                                : (n.subscribeForm.$valid = !0),
                            n.validate("email"),
                            n.validateCheckbox(),
                            n.subscribeForm && n.subscribeForm.$valid && !n.subscribeForm.emailInvalid
                                ? ((r = "widget.MailChimp_" + new Date().getTime()), i.enable(r), (n.message.list_id = n.listId || ""), t.subscribe({ request: n.message }).success(g).error(p))
                                : (n.sending = !1));
                    });
            },
        ]),
    angular.module("website.widget.menu", []).directive("motoWidgetMenu", function () {
        var i,
            e = $(window),
            s = [];
        function r() {
            return 768 <= (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
        }
        return (
            (i = r()),
            e.on("resize", function () {
                var e,
                    t,
                    n,
                    o = r();
                if (i !== o && (i = o))
                    for (e = 0, t = s.length; e < t; e++)
                        try {
                            (n = s[e]).$element.find(".moto-widget-menu-item-has-submenu_opened").removeClass("moto-widget-menu-item-has-submenu_opened"),
                                n.$element.find(".moto-widget-menu-sublist").css("display", ""),
                                n.$element.removeClass("moto-widget-menu-mobile-open");
                        } catch (e) {}
            }),
            {
                restrict: "C",
                priority: 450,
                link: function (e, t) {
                    var n = t.find(".moto-widget-menu-toggle-btn"),
                        o = t.find(".moto-widget-menu-link"),
                        i = t.find(".moto-widget-menu-item-has-submenu"),
                        r = i.find(".moto-widget-menu-sublist"),
                        a = t.find(".moto-widget-menu-link-arrow");
                    s.push({ $element: t, $toggleButton: n }),
                        n.on("click", function (e) {
                            e.preventDefault(), t.toggleClass("moto-widget-menu-mobile-open"), t.hasClass("moto-widget-menu-mobile-open") && a.is(":visible") && r.hide();
                        }),
                        o.on("click", function (e) {
                            $(e.target).hasClass("moto-widget-menu-link-arrow") || (t.hasClass("moto-widget-menu-mobile-open") && t.toggleClass("moto-widget-menu-mobile-open"));
                        }),
                        i.length &&
                            a.on("click", function (e) {
                                n.is(":hidden") ||
                                    (e.stopPropagation(), e.preventDefault(), $(this).closest(".moto-widget-menu-item-has-submenu").toggleClass("moto-widget-menu-item-has-submenu_opened").find("> .moto-widget-menu-sublist").toggle());
                            });
                },
            }
        );
    }),
    angular.module("website.widget.MotoCallback", []).directive("motoWidgetCallback", [
        function () {
            return {
                restrict: "A",
                link: function (e, t) {
                    t.motoCallback();
                },
            };
        },
    ]),
    angular.module("website.widget.pinterest", ["website.core"]).directive("motoWidgetPinterest", [
        "motoDependencyService",
        function (e) {
            return {
                restrict: "AC",
                link: function () {
                    try {
                        e.get("pinterest").require();
                    } catch (e) {}
                },
            };
        },
    ]),
    angular.module("website.widget.slider", []).directive("motoSliderOptions", [
        "$timeout",
        "website.Entertainment",
        function (u, d) {
            return {
                restrict: "A",
                priority: 450,
                link: function (e, t, n) {
                    var o,
                        i,
                        r,
                        a,
                        s,
                        l = { $scope: e, $element: t },
                        c = e.$eval(n.motoSliderOptions);
                    (c.id = t.closest(".moto-widget-slider").attr("id")),
                        (s = c).itemsCount < 2 && (s.showPaginationDots = !1),
                        (o = {
                            mode: s.slideshowAnimationType,
                            auto: !1,
                            pause: 1e3 * s.slideshowDelay,
                            controls: s.showNextPrev,
                            pager: s.showPaginationDots,
                            pagerCustom: null,
                            captions: s.showSlideCaptions,
                            stopAutoOnClick: !0,
                            onSliderLoad: function () {
                                t.closest(".moto-widget-slider").removeClass("moto-widget-slider-loader");
                            },
                        }),
                        c.thumbnailPagination.enable &&
                            ((a = $("#" + c.id + "__thumbnail-pagination")),
                            (o.pagerCustom = a),
                            (o.onSlideBefore = function (e, t, n) {
                                var o = a.children(":nth-child(" + (n + 1) + ")"),
                                    i = o[0].offsetLeft - a.innerWidth() / 2 + o.innerWidth() / 2;
                                a.animate({ scrollLeft: i }, 400);
                            })),
                        (i = t.bxSlider(o)),
                        e.$on("$destroy", i.destroySlider),
                        d.$onLetsDanceEvent(l, function () {
                            (r = i.find(".bx-caption")).removeClass("bx-caption"),
                                r.css("display", "none"),
                                i.reloadSlider(angular.extend({}, o, { startSlide: i.getCurrentSlide() })),
                                r.addClass("bx-caption"),
                                r.css("display", ""),
                                d.isDisabledPlaying(t) || (c.slideshowEnabled && i.startAuto(), u(i.redrawSlider));
                        }),
                        d.$onLetsStopEvent(l, function () {
                            i.stopAuto();
                        });
                },
            };
        },
    ]),
    angular.module("website.widget.social_buttons", ["website.core"]).directive("motoWidgetSocialButtons", [
        "$rootScope",
        function (o) {
            return {
                restrict: "AC",
                link: function (e, t) {
                    function n() {
                        var e;
                        try {
                            (e = t.find('li.social-button[data-name="linkedIn_share"]')).length && ((e = angular.element(e.get(0))).html(e.html().replace("<span", "<script").replace("</span>", "</script>")), IN.parse());
                        } catch (e) {}
                    }
                    window.IN && angular.isFunction(window.IN.parse) ? n() : o.$on("motoDependencyService.linkedin.loaded", n);
                },
            };
        },
    ]),
    angular.module("website.widget.tile_gallery", []).directive("motoWidgetTileGalleryItemsWrapper", [
        function () {
            return {
                restrict: "C",
                link: function (e, t) {
                    t.tileGallery();
                },
            };
        },
    ]),
    angular.module("website.widget.twitter", ["website.core", "website.widget.twitter.time_line"]),
    angular.module("website.widget.twitter.time_line", ["ng"]).directive("motoWidgetTwitterTimeLine", [
        "motoDependencyService",
        function (e) {
            return {
                restrict: "AC",
                link: function () {
                    try {
                        e.require("twitter");
                    } catch (e) {}
                },
            };
        },
    ]),
    angular
        .module("website.widget.video_player", ["website.core", "website.core.media"])
        .directive("motoMediaPlayer", [
            function () {
                return {
                    restrict: "AC",
                    scope: !0,
                    compile: function (n) {
                        return {
                            pre: function (e) {
                                function t() {
                                    e.$emit("UserInteraction", "StartInteraction");
                                }
                                n.closest(".moto-widget_interactive").length < 1 ||
                                    (n.on("click", t),
                                    e.$on("$destroy", function () {
                                        n.off("click", t);
                                    }));
                            },
                        };
                    },
                };
            },
        ])
        .directive("motoWidgetVideoPlayer", [
            "website.MediaService",
            "$q",
            "website.Entertainment",
            function (w, v, _) {
                return {
                    restrict: "AC",
                    link: function (e, t, n) {
                        var o,
                            i,
                            r,
                            a,
                            s,
                            l,
                            c,
                            u,
                            d = !1,
                            m = !0,
                            g = { $scope: e, $element: t },
                            p = e.$eval(n.autoplaySettings),
                            f = t.find(".moto-media-player-container").data("buttons");
                        function h() {
                            s.prop("disabled", 0 === c[0].readyState || !document.pictureInPictureEnabled || c[0].disablePictureInPicture);
                        }
                        function y(e) {
                            s.prop("disabled", !0),
                                c[0] !== document.pictureInPictureElement
                                    ? c[0]
                                          .requestPictureInPicture()
                                          .finally(function () {
                                              s.prop("disabled", !1);
                                          })
                                          .catch(function (e) {
                                              console.error("[motoWidgetVideoPlayer] Can't toggle Picture-in-Picture mode:", e);
                                          })
                                    : document
                                          .exitPictureInPicture()
                                          .finally(function () {
                                              s.prop("disabled", !1);
                                          })
                                          .catch(function (e) {
                                              console.error("[motoWidgetVideoPlayer] Can't toggle Picture-in-Picture mode:", e);
                                          });
                        }
                        function b() {
                            l.toggleClass("pic-to-pic-fallback-mode");
                        }
                        angular.isObject(p) && (o = { enabled: !0, allowed: _.isEnabledPlaying(t), forced: p.forced, startOn: p.onlyWhenVisible ? "onFirstVisible" : "default" }),
                            (r = t.find("video")).on("loadeddata", function () {
                                a.options.alwaysShowControls = !1;
                            }),
                            (i = w.registerItem({
                                node: t,
                                scope: e,
                                ready: !1,
                                autoplay: o,
                                pause: function () {
                                    (d = !1), r.off("canplay"), (m = !0), a.pause();
                                },
                                play: function () {
                                    function e() {
                                        v.when(a.domNode.play())
                                            .then(function () {
                                                m ? a.domNode.pause() : a.domNode.play();
                                            })
                                            .catch(function () {
                                                (m = !0), w.autoplayFailed();
                                            });
                                    }
                                    (m = !1),
                                        4 === a.readyState
                                            ? e()
                                            : ((d = !0),
                                              r.one("canplay", function () {
                                                  (d = !1), e();
                                              }),
                                              0 === a.readyState && r.load());
                                },
                                isPlaying: function () {
                                    return !a.paused || (!m && d);
                                },
                            })),
                            r.mediaelementplayer({
                                classPrefix: "mejs-",
                                motoTrackName: r.attr("title") || "",
                                timeAndDurationSeparator: "<span>/</span>",
                                startVolume: 1,
                                playText: "",
                                pauseText: "",
                                alwaysShowControls: !0,
                                fullscreenText: "",
                                allyVolumeControlText: "",
                                videoVolume: "horizontal",
                                features: ["playpause", "progress", "current", "duration", "mototrackname", "volume", "fullscreen", f && f.download ? "motodownload" : "", f && f.pip ? "motopip" : "", "motoskin"],
                                plugins: [],
                                duration: r.attr("duration"),
                                success: function (e, t, n) {
                                    (a = n), w.itemReady(i);
                                },
                            }),
                            _.$onLetsDanceEvent(g, function () {
                                a && a.globalResizeCallback(), (i.autoplay.allowed = _.isEnabledPlaying(t)), w.checkAndAutoplayItem(i);
                            }),
                            _.$onLetsStopEvent(g, function () {
                                (i.autoplay.allowed = !1), i.pause();
                            }),
                            f &&
                                f.pip &&
                                ((s = (u = t).find(".mejs-pic-to-pic button")),
                                (c = u.find("video")),
                                (l = u.find(".mejs-container")),
                                "disablePictureInPicture" in c[0] && "pictureInPictureEnabled" in document ? (s.on("click", y), h(), c.on("loadedmetadata", h), c.on("emptied", h)) : s.on("click", b));
                    },
                };
            },
        ]),
    angular.module("website.widget.accordion", []),
    angular.module("website.widget.content_sections", []),
    angular.module("website.widget.content_slider", ["website.core.utils", "website.core.widgets"]),
    angular.module("website.widget.google_search", ["ngSanitize", "website.widget.google_search.directive", "website.widget.google_search.service"]),
    angular.module("website.widget.tabs", []),
    angular.module("website.widget.text_button", []),
    angular.module("website.widget.accordion").directive("motoWidgetAccordionItem", [
        "website.WidgetsRepository",
        function (n) {
            return {
                restrict: "C",
                scope: !0,
                compile: function (e) {
                    var t = n.registry(e);
                    return {
                        pre: function (e) {
                            t.setScope(e);
                        },
                    };
                },
            };
        },
    ]),
    angular.module("website.widget.accordion").directive("motoWidgetAccordion", [
        "website.WidgetsRepository",
        function (n) {
            var o = { startAnimation: "onArriving" };
            return {
                restrict: "C",
                scope: !0,
                compile: function (e) {
                    var t = n.registry(e);
                    return {
                        pre: function (e) {
                            t.setScope(e);
                        },
                        post: function () {
                            e.motoAccordion({
                                onOpening: function (e) {
                                    t.getChild(e.id).onArriving(o);
                                },
                                onOpened: function (e) {
                                    t.getChild(e.id).onArrived(o);
                                },
                                onClosing: function (e) {
                                    t.getChild(e.id).onVanishing();
                                },
                                onClosed: function (e) {
                                    t.getChild(e.id).onVanished();
                                },
                            });
                        },
                    };
                },
            };
        },
    ]),
    (function (d) {
        var a = "moto-widget-accordion__item_open",
            o = "moto-widget-accordion__item_collapsing",
            i = 400,
            m = d(window);
        function g(e, t, n) {
            (e.opened = !1),
                e.$wrapperNode.slideUp({
                    duration: i,
                    start: function () {
                        e.$node.addClass(o).removeClass(a), t && t(e);
                    },
                    complete: function () {
                        e.$node.removeClass(o), n && n(e);
                    },
                });
        }
        function p(t, e, n) {
            (t.opened = !0),
                t.$wrapperNode.slideDown({
                    duration: i,
                    start: function () {
                        t.$node.addClass(o).addClass(a), e && e(t);
                    },
                    complete: function () {
                        var e;
                        t.$node.removeClass(o), (e = t.$node).offset().top < d(document).scrollTop() && d("html, body").animate({ scrollTop: e.offset().top }, i), n && n(t);
                    },
                });
        }
        d.fn.motoAccordion = function (l) {
            var c,
                u = void 0 !== this.attr("data-close-others");
            "object" !== _typeof(l) && (l = {}),
                (c = (function (e, t) {
                    var n,
                        o,
                        i,
                        r = {};
                    for (i = 0; i < e.length; i++)
                        (r[(n = (o = d(e[i])).attr("id") || o.attr("data-widget-id"))] = { id: n, $node: o, opened: o.hasClass(a), $wrapperNode: o.children(".moto-widget-accordion__content-wrapper") }),
                            r[n].opened ? t.onOpened && t.onOpened(r[n]) : t.onClosed && t.onClosed(r[n]);
                    return r;
                })(this.find(">.moto-widget-accordion__wrapper>.moto-widget-accordion__item"), l)),
                this.off("click", ">.moto-widget-accordion__wrapper>.moto-widget-accordion__item>.moto-widget-accordion__header"),
                this.on("click", ">.moto-widget-accordion__wrapper>.moto-widget-accordion__item>.moto-widget-accordion__header", function (e) {
                    var t,
                        n,
                        o,
                        i,
                        r,
                        a = d(e.currentTarget).attr("data-widget-id"),
                        s = c[a];
                    s.opened || !u
                        ? ((t = s), (n = l.onOpening), (o = l.onOpened), (i = l.onClosing), (r = l.onClosed), t.opened ? g(t, i, r) : p(t, n, o))
                        : (!(function (e, t, n) {
                              var o;
                              for (o in e) e.hasOwnProperty(o) && e[o].opened && g(e[o], t, n);
                          })(c, l.onClosing, l.onClosed),
                          p(s, l.onOpening, l.onOpened)),
                        m.resize();
                });
        };
    })(jQuery),
    angular.module("website.widget.actions", ["website.widget.actions.open_popup"]),
    angular.module("website.widget.actions.open_popup", []).directive("motoWidgetActionsOpenPopup", [
        "$timeout",
        "website.MotoPopupService",
        "motoBeforeInViewport",
        function (a, s, l) {
            return {
                restrict: "C",
                scope: !0,
                link: function (e, t, n) {
                    var o,
                        i = e.$eval(n.actionsOpenPopupOptions);
                    function r() {
                        s.pleaseOpenPopup(i.popupId, o);
                    }
                    i.popupId &&
                        s.shouldPopupBeOpened(i.actionId, i.recurrenceCondition, i.recurrenceOptions) &&
                        ("always" !== i.recurrenceCondition &&
                            (o = function () {
                                s.updateDataInStorage(i.actionId, i.recurrenceCondition);
                            }),
                        "timer" === i.triggerType ? a(r, i.delayTime) : "placement" === i.triggerType && l.startWatching({ element: t, onEnter: r }));
                },
            };
        },
    ]),
    angular.module("website.widget.content_sections").directive("motoWidgetContentSectionAppliedFilters", [
        "$timeout",
        "contentSectionsFiltersService",
        function (n, o) {
            function i(e) {
                var t = window.websiteConfig.contentSectionAbsoluteAddress || window.websiteConfig.pageAbsoluteAddress;
                return (e = angular.isObject(e) ? e.toString() : e) && (t += (-1 < t.indexOf("?") ? "&" : "?") + e), t;
            }
            function r(e) {
                e.find(".moto-widget-content_section-applied_filters__reset-link").attr("href", i(o.toUrlWithoutFiltersAndSearchParams()));
            }
            function a(e) {
                var t = new URLSearchParams(location.search);
                e.find(".moto-widget-content_section-applied_filters__filter-option-reset-link").each(function () {
                    var e = $(this),
                        n = new URLSearchParams(),
                        o = e.attr("data-option-id");
                    t.forEach(function (e, t) {
                        "page" === t || ("taxonomies[]" === t && o === e) || ("search" === t && o === t) || n.append(t, e);
                    }),
                        n.getAll("taxonomies[]").forEach(function (e, t) {
                            e || n.delete("taxonomies[]");
                        }),
                        e.attr("href", i(n));
                });
            }
            return {
                restrict: "C",
                link: function (e, t) {
                    t.find(".moto-widget-content_section-applied_filters__reset-link");
                    n(function () {
                        r(t), a(t);
                    }),
                        o.onChange(function () {
                            a(t), r(t);
                        });
                },
            };
        },
    ]),
    angular.module("website.widget.content_sections").directive("motoWidgetContentSectionCalendar", [
        function () {
            return {
                restrict: "C",
                link: function (e, t) {
                    t.mdEventsCalendar();
                },
            };
        },
    ]),
    angular.module("website.widget.content_sections").directive("motoWidgetContentSectionFilters", [
        "contentSectionsFiltersService",
        function (a) {
            function s(e, t) {
                var n = window.websiteConfig.contentSectionAbsoluteAddress || window.websiteConfig.pageAbsoluteAddress;
                return (e = angular.isObject(e) ? e.toString() : e) && (n += (-1 < n.indexOf("?") ? "&" : "?") + e), t && (n += "#" + t), n;
            }
            return {
                restrict: "C",
                scope: !0,
                link: function (t, e, n) {
                    var o = e.find('[data-filters-button-type="apply"]'),
                        i = e.find('[data-filters-button-type="reset"]'),
                        r = n.anchor;
                    (t.model = a.getLinkedModel()),
                        (t.selectedTaxonomies = []),
                        (t.convertModelToSelect = function () {
                            for (var e in ((t.selectedTaxonomies = []), t.model.filters.taxonomies)) t.model.filters.taxonomies[e] && t.selectedTaxonomies.push(e);
                        }),
                        (t.convertSelectToModel = function () {
                            for (var e in (t.selectedTaxonomies.forEach(function (e) {
                                t.model.filters.taxonomies[e] = !0;
                            }),
                            t.model.filters.taxonomies))
                                t.model.filters.taxonomies[e] = -1 < t.selectedTaxonomies.indexOf(e);
                        }),
                        (t.onFieldChanged = function () {
                            a.triggerChangeEvent();
                        }),
                        (t.onFieldChangedViaSelect = function () {
                            t.convertSelectToModel(), t.onFieldChanged();
                        }),
                        a.onChange(function () {
                            o.attr("href", s(a.toQueryParams(), r)), i.attr("href", s(a.toUrlWithoutFiltersAndSearchParams(), r)), t.convertModelToSelect();
                        }),
                        t.convertModelToSelect(),
                        e.motoContentSectionFilters();
                },
            };
        },
    ]),
    (function (m) {
        var r,
            o,
            i = m.fn.getMotoDevices(),
            e = "moto-preview",
            g = websiteConfig.timeZone,
            a = { viewType: null, currentStart: null },
            u = ["dayGridMonth", "listMonth"];
        function d() {
            return m("body").hasClass(e);
        }
        function s(e, t) {
            if (!t || d())
                return window.Promise.resolve(
                    d()
                        ? (function () {
                              for (var e = Date.now(), t = e + 864e5, n = [], o = 1; o <= 5; o++)
                                  n.push({ name: "Example Event ".concat(o), url: "#", is_full_day: !1, start_at: new Date(e + 36e5 * (o - 1)).toISOString(), end_at: new Date(e + 36e5 * o).toISOString() });
                              return (
                                  n.push({ name: "Example Event Full Day", url: "#", is_full_day: !0, start_at: new Date(t).toISOString().split("T")[0], end_at: new Date(t + 864e5).toISOString().split("T")[0] }),
                                  n.push({ name: "Example Event With Long Name", url: "#", is_full_day: !1, start_at: new Date(t).toISOString(), end_at: new Date(t + 36e5).toISOString() }),
                                  n
                              );
                          })()
                        : []
                );
            var n = { from: e.start.toISOString(), to: e.end.toISOString() };
            return o && ((n.search = o.getLinkedModel().search), (n.taxonomies = o.getSelectedTaxonomiesAsArray())), t(n);
        }
        function p(e, t) {
            if (e[t] && e[t].height) return e[t].height;
            for (var n = i.indexOf(t); 0 <= n; n--) if (e[i[n]] && e[i[n]].height) return e[i[n]].height;
            return e[i[0]].height;
        }
        function f(e, t) {
            return e[t] ? e[t] : e[i[0]];
        }
        function h(e) {
            var t = e.getView();
            (a.viewType = t.type),
                (a.currentStart = t.currentStart),
                e.setOption("datesSet", function (e) {
                    !(function (e, t) {
                        var n = new URL(window.location);
                        if ((e !== a.viewType && (n.searchParams.set("calendar_view", e), (a.viewType = e)), t.getTime() !== a.currentStart.getTime())) {
                            var o = t.toISOString().split("T")[0];
                            n.searchParams.set("calendar_start", o), (a.currentStart = t);
                        }
                        window.history.replaceState({}, "", n);
                    })(e.view.type, e.view.currentStart),
                        o && o.triggerChangeEvent();
                });
        }
        function y(u, t) {
            var d = new Intl.DateTimeFormat(void 0, { timeStyle: "full", timeZone: g }),
                e = t.data("serviceName"),
                n = e && r ? r.newService(e).createMethod("getEvents") : null;
            var o = {
                    selectable: !1,
                    editable: !1,
                    eventStartEditable: !1,
                    eventDurationEditable: !1,
                    eventTimeFormat: { hour: "numeric", minute: "2-digit", timeZone: g },
                    eventContent: function (e) {
                        var t = e.event,
                            n = t.allDay,
                            o = t.title,
                            i = t.start,
                            r = t.extendedProps.url,
                            a = e.timeText,
                            s = e.view.type,
                            l = m('<a class="moto-widget-content_section-calendar__event-link" href="'.concat(r, '"></a>')),
                            c = !n;
                        return (
                            c && "dayGridMonth" === s && (c = u.monthView.showTime),
                            c && l.append('<div class="moto-widget-content_section-calendar__event-time" title="'.concat(d.format(i), '">').concat(a, "</div>")),
                            l.append('<div class="moto-widget-content_section-calendar__event-title">'.concat(o, "</div>")),
                            u.monthView.showFullTitle && "dayGridMonth" === s && l.addClass("moto-widget-content_section-calendar__event-link_full-title"),
                            { html: l[0].outerHTML }
                        );
                    },
                    loading: function (e) {
                        e ? t.addClass("moto-widget-content_section-calendar_loading") : t.removeClass("moto-widget-content_section-calendar_loading");
                    },
                    eventSources: [
                        {
                            events: function (e) {
                                return s(e, n).then(function (e) {
                                    return (
                                        (o = u),
                                        e.map(function (e) {
                                            var t = e.is_full_day,
                                                n = t ? o.defaultForEvent.allDay : o.defaultForEvent.base;
                                            return _objectSpread({ allDay: t, title: e.name, start: new Date(e.start_at), end: new Date(e.end_at), extendedProps: { url: e.url } }, n);
                                        })
                                    );
                                    var o;
                                });
                            },
                        },
                    ],
                },
                i = t.getCurrentMotoDevice();
            return (
                "object" !== _typeof(u) ||
                    (u.height.auto ? (o.height = "auto") : (o.height = p(u.height.manual, i)),
                    (o.view = f(u.defaultViews, t.getCurrentMotoDevice())),
                    (o.headerToolbar = (function (e) {
                        function t(e) {
                            return e.visible ? { date_switcher: "prev,next today", selected_period: "title", mode_switcher: "dayGridMonth,listMonth" }[e.name] : "";
                        }
                        return { start: t(e.items[0]), center: t(e.items[1]), end: t(e.items[2]) };
                    })(u.toolbar)),
                    (o.firstDay = u.firstDay),
                    (o.buttonText = u.buttonText),
                    (o.dayMaxEvents = u.monthView.limitEventsPerDay),
                    o.dayMaxEvents &&
                        (o.moreLinkContent = function (e) {
                            var t = e.num;
                            return e.text, "+".concat(t, " ").concat(u.monthView.limitedEventsLabel);
                        })),
                o
            );
        }
        angular.module("website.content_sections").run([
            "jsonrpc",
            "contentSectionsFiltersService",
            function (e, t) {
                (r = e), (o = t);
            },
        ]),
            (m.fn.mdEventsCalendar = function () {
                var t = this,
                    e = m(window),
                    n = t.find(".moto-widget-content_section-calendar__calendar")[0],
                    o = t.data("settings"),
                    i = y(o, t),
                    r = (function () {
                        var e,
                            t,
                            n = new URLSearchParams(window.location.search);
                        if (n.has("calendar_view")) {
                            var o = n.get("calendar_view");
                            u.includes(o) && (e = o);
                        }
                        if (n.has("calendar_start")) {
                            var i = n.get("calendar_start");
                            t = new Date(i);
                        }
                        return { view: e, currentStart: t };
                    })(),
                    a = r.view,
                    s = r.currentStart;
                (t.eventCalendarInstance = new EventCalendar(n, i)),
                    t.closest(".moto-popup").length || d() || h(t.eventCalendarInstance),
                    a && t.eventCalendarInstance.setOption("view", a),
                    s && (s.setDate(s.getDate() + 1), t.eventCalendarInstance.setOption("date", s)),
                    (t.mdEventsCalendarSetHeight = function (e) {
                        return o.height.auto ? t.eventCalendarInstance.setOption("height", "auto") : ((e = e || p(o.height.manual, t.getCurrentMotoDevice())), t.eventCalendarInstance.setOption("height", e)), t;
                    }),
                    (t.mdEventsCalendarSetView = function (e) {
                        return (e = e || f(o.defaultViews, t.getCurrentMotoDevice())), t.eventCalendarInstance.setOption("view", e), t;
                    }),
                    (t.mdEventsCalendarApplyDevice = function () {
                        var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : t.getCurrentMotoDevice();
                        t.mdEventsCalendarSetHeight(p(o.height.manual, e)), t.mdEventsCalendarSetView(f(o.defaultViews, e));
                    }),
                    (t.mdEventsCalendarUpdate = function () {
                        t.mdEventsCalendarApplyDevice();
                    }),
                    m("body").hasClass("moto-preview-mode_content") ||
                        e.on("motoDeviceChanged", function (e) {
                            t.mdEventsCalendarApplyDevice(e.originalEvent.detail.device);
                        });
                var l = t.find(".moto-widget-content_section-calendar__timezone");
                if (l[0]) {
                    var c = new Intl.DateTimeFormat(void 0, { timeZone: g, timeZoneName: "long" }).formatToParts(Date.now()).find(function (e) {
                        return "timeZoneName" === e.type;
                    }).value;
                    l.text(c);
                }
                return t;
            });
    })(jQuery),
    (function (r) {
        var a = "moto-widget-content_section-filters__filter_opened",
            e = !1,
            s = r(document);
        function l(e) {
            e.removeClass(a);
        }
        function c(e) {
            e.hasClass(a) ? l(e) : e.addClass(a);
        }
        function t() {
            e ||
                (s.on("click", function (e) {
                    var t,
                        n,
                        o = r(e.target),
                        i = o.closest('.moto-widget-content_section-filters[data-filters-behavior="dropdown"] .moto-widget-content_section-filters__filter');
                    i.length
                        ? ((n = i),
                          s.find('.moto-widget-content_section-filters[data-filters-behavior="dropdown"] .moto-widget-content_section-filters__filter.' + a).each(function () {
                              this !== n[0] && l(r(this));
                          }),
                          (t = o.closest('.moto-widget-content_section-filters[data-filters-behavior="dropdown"] .moto-widget-content_section-filters__filter-label_desktop')).length && c(t.parent()))
                        : s.find('.moto-widget-content_section-filters[data-filters-behavior="dropdown"] .moto-widget-content_section-filters__filter.' + a).each(function () {
                              l(r(this));
                          });
                }),
                (e = !0));
        }
        r.fn.motoContentSectionFilters = function () {
            var e = this.attr("data-filters-behavior");
            "static" !== e &&
                ("accordion" === e &&
                    (this.off("click", ".moto-widget-content_section-filters__filter-label_desktop"),
                    this.on("click", ".moto-widget-content_section-filters__filter-label_desktop", function (e) {
                        c(r(e.currentTarget).parent());
                    })),
                "dropdown" === e && t());
        };
    })(jQuery),
    angular.module("website.widget.content_sections").directive("motoWidgetContentSectionSearch", [
        "contentSectionsFiltersService",
        function (a) {
            function s(e, t) {
                var n = window.websiteConfig.contentSectionAbsoluteAddress || window.websiteConfig.pageAbsoluteAddress;
                return (e = angular.isObject(e) ? e.toString() : e) && (n += (-1 < n.indexOf("?") ? "&" : "?") + e), t && (n += "#" + t), n;
            }
            return {
                restrict: "C",
                scope: !0,
                link: function (t, e, n) {
                    var o = e.find("[data-search-button-apply]"),
                        i = e.find('input[name="search"]'),
                        r = n.anchor;
                    n.syncWithFilters
                        ? ((t.model = a.getLinkedModel()),
                          (t.onFieldChanged = function () {
                              a.triggerChangeEvent();
                          }),
                          a.onChange(function () {
                              o.attr("href", s(a.toQueryParams(t.model), r));
                          }))
                        : ((t.model = a.fromQueryParams()),
                          (t.model = { search: t.model.search }),
                          (t.onFieldChanged = function () {
                              o.attr("href", s(a.toUrlWithoutFilterParams(t.model), r));
                          }),
                          o.attr("href", s(a.toUrlWithoutFilterParams(t.model), r)),
                          a.onChange(function () {
                              o.attr("href", s(a.toUrlWithoutFilterParams(t.model), r));
                          })),
                        i.on("keypress", function (e) {
                            13 === e.which && (window.location.href = s(a.toQueryParams(t.model), r));
                        });
                },
            };
        },
    ]),
    angular.module("website.widget.content_slider").directive("motoWidgetContentSliderItem", [
        "website.ContentWidgetClass",
        "website.WidgetsRepository",
        function (n, o) {
            return {
                restrict: "C",
                scope: !0,
                compile: function (e) {
                    var t = new n(e);
                    return (
                        o.registry(t),
                        {
                            pre: function (e) {
                                t.setScope(e);
                            },
                        }
                    );
                },
            };
        },
    ]),
    angular.module("website.widget.content_slider").directive("motoContentSlider", [
        "website.ContentWidgetClass",
        "website.ElementHeightWatcherClass",
        "website.WidgetsRepository",
        "MotoIntervalService",
        function (e, t, g, p) {
            var n = window.document.createEvent("Event");
            function f() {
                setTimeout(window.dispatchEvent.bind(null, n), 50);
            }
            return (
                n.initEvent("resize", !0, !1),
                {
                    restrict: "A",
                    scope: !0,
                    compile: function (s) {
                        var l,
                            c = new e(s),
                            u = new t({ $element: s.find("#" + c.id + "__loader"), watchSelector: "#" + c.id + "__content > .moto-widget" }),
                            d = s.find(".moto-widget-content_slider__item"),
                            m = 0;
                        return (
                            u.show(),
                            g.registry(c),
                            {
                                pre: function (e) {
                                    c.setScope(e);
                                },
                                post: function (e, t, n) {
                                    var o,
                                        r,
                                        i,
                                        a = {
                                            onSliderLoad: function (e) {
                                                var t = c.getChild(e);
                                                u && (u.destroy(), (u = null)),
                                                    c.$element.removeClass("moto-widget__state_loading"),
                                                    this.redrawSlider(),
                                                    (l = p.registerCallback(
                                                        function () {
                                                            var e;
                                                            m < 5
                                                                ? m++
                                                                : ((m = 0),
                                                                  (e = s.innerHeight()),
                                                                  d.eq(this.getCurrentSlide()).find(".moto-widget__content-wrapper>.moto-widget__content>.moto-cell").innerHeight() !== e && this.redrawSlider());
                                                        }.bind(this)
                                                    )),
                                                    t && (t.onVisibleImmediately(r), f());
                                            },
                                            onSliderResize: function (e) {
                                                var t = c.getChild(e);
                                                t && t.onResizing();
                                            },
                                            onSlideBefore: function (e, t, n) {
                                                var o = c.getChild(t),
                                                    i = c.getChild(n);
                                                o && o.onVanishing(), i && i.onArriving(r), f();
                                            },
                                            onSlideAfter: function (e, t, n) {
                                                var o = c.getChild(t),
                                                    i = c.getChild(n);
                                                o && o.onVanished(), i && i.onArrived(r);
                                            },
                                            onSlideNext: function (e, t, n) {},
                                            onSlidePrev: function (e, t, n) {},
                                        };
                                    (e.params = e.$eval(n.motoContentSlider)),
                                        angular.isObject(e.params) || (e.params = {}),
                                        angular.isObject(e.params.options) || (e.params.options = {}),
                                        angular.isObject(e.params.preferences) || (e.params.preferences = {}),
                                        (r = angular.copy({ startAnimation: "onArriving" })),
                                        angular.extend(r, e.params.preferences),
                                        (i = angular.copy({ auto: !1, pause: 1e4, controls: !1, pager: !1, stopAutoOnClick: !0, autoControls: !1, autoControlsCombine: !0, preloadImages: "all" })),
                                        angular.extend(i, e.params.options),
                                        c.$content.find(">.moto-widget-content_slider__item").length <= 1 && ((i.controls = !1), (i.pager = !1)),
                                        angular.extend(i, a),
                                        e.$on("UserInteraction", function (e, t) {
                                            "StartInteraction" === t && (o ? o.stopAuto() : (i.auto = !1));
                                        }),
                                        (o = c.$content.bxSlider(i)),
                                        e.$on("$destroy", function () {
                                            o && o.destroySlider(), u && (u.destroy(), (u = null)), l(), g.forget(c);
                                        });
                                },
                            }
                        );
                    },
                }
            );
        },
    ]),
    (function (i) {
        i.fn.motoCounter = function (e) {
            var t, n, o;
            if (!e || !angular.isObject(e)) return !1;
            (jQuery.easing.easeOutCirc = function (e, t, n, o, i) {
                return o * Math.sqrt(1 - (t = t / i - 1) * t) + n;
            }),
                (o = i.extend({}, { countFrom: 0, countTo: 100, duration: 3, easing: "easeOutCirc", complete: null, elementSelector: ".moto-widget-counter__value" }, e)),
                (t = i(this)),
                (n = t.find(o.elementSelector)),
                t.stop(),
                i({ count: o.countFrom }).animate(
                    { count: o.countTo },
                    {
                        duration: 1e3 * o.duration,
                        easing: o.easing,
                        step: function () {
                            var e = Math.ceil(this.count);
                            n.text(e);
                        },
                        complete: function () {
                            n.text(o.countTo);
                        },
                    }
                );
        };
    })(jQuery),
    angular.module("website.core.form").directive("motoFormAttachmentButton", [
        "$timeout",
        function (a) {
            function s(e, t, n) {
                var o, i;
                if (angular.isUndefined(t) || angular.isUndefined(n)) return !1;
                for (n = !!n, angular.isObject(t) && (t = Object.keys(t)), angular.isArray(t) || (t = [t]), o = 0, i = t.length; o < i; o++) e.$setValidity(t[o], n);
                return !0;
            }
            function l(e) {
                return null === e && (e = void 0), e;
            }
            return {
                restrict: "A",
                require: "?ngModel",
                link: function (e, t, o, i) {
                    function n() {
                        var e;
                        s(i, i.$error, !0),
                            (function (e) {
                                var t,
                                    n,
                                    o = e.$modelValue;
                                if ((o instanceof File && (o = [o]), !angular.isArray(o) || o.length < 1)) return;
                                for (t = 0, n = o.length; t < n; t++) s(e, o[t].$error, !1);
                            })(i),
                            o.required && (!(e = i).$modelValue || (angular.isArray(e.$modelValue) && e.$modelValue.length < 1)) && e.$setValidity("required", !1),
                            i.$setTouched();
                    }
                    function r(e) {
                        return a(n), e;
                    }
                    e.$on("MotoForm::removeAttachedFile", function (e, t) {
                        var n;
                        if (!(t instanceof File)) return !1;
                        i.$modelValue === t && i.$setViewValue(void 0),
                            angular.isArray(o.$$ngfPrevValidFiles) && -1 < (n = o.$$ngfPrevValidFiles.indexOf(t)) && o.$$ngfPrevValidFiles.splice(n, 1),
                            angular.isArray(o.$$ngfPrevInvalidFiles) && -1 < (n = o.$$ngfPrevInvalidFiles.indexOf(t)) && o.$$ngfPrevInvalidFiles.splice(n, 1),
                            r();
                    }),
                        i.$parsers.push(r),
                        i.$parsers.push(l);
                },
            };
        },
    ]),
    angular.module("website.core.form").directive("motoFormAttachmentField", [
        function () {
            return {
                restrict: "A",
                scope: !0,
                link: function (t) {
                    t.removeAttachedFile = function (e) {
                        t.$broadcast("MotoForm::removeAttachedFile", e);
                    };
                },
            };
        },
    ]),
    angular.module("website.core.form").directive("motoFormErrors", [
        function () {
            var o = {
                    minlength: "The field lengths should be more than [[ MIN_LENGTH ]] characters",
                    maxlength: "The field lengths should not exceed [[ MAX_LENGTH ]] characters",
                    min: "The value should be more than [[ MIN_VALUE ]]",
                    max: "The value should not exceed [[ MAX_VALUE ]]",
                    email: "Please enter a valid email",
                    url: "Please enter a valid URL",
                    number: "Please enter a valid number",
                    tel: "Please enter a valid phone number",
                    pattern: "Please enter a valid [[ PATTERN ]]",
                    required: "The field is required",
                    date: "Please enter a valid date in format YYYY-MM-DD",
                    maxFileSize: "The file size should not exceed [[ MAX_SIZE ]]",
                    fileExtension: "This file extension is not supported",
                },
                i = { minlength: "MIN_LENGTH", maxlength: "MAX_LENGTH", min: "MIN_VALUE", max: "MAX_VALUE", maxFileSize: "MAX_SIZE" };
            return {
                restrict: "A",
                templateUrl: "@websiteWidgets/form_elements/moto_form_errors.ng.html",
                scope: { $FORM: "=form", fieldName: "@", fieldType: "@", rules: "=" },
                link: function (e) {
                    var t,
                        n = null;
                    if (!e.$FORM) return !1;
                    if ((angular.isFunction(e.$FORM.getValidationMessages) && (n = angular.copy(e.$FORM.getValidationMessages())), angular.isObject(n) && !angular.isArray(n)))
                        for (t in o) o.hasOwnProperty(t) && ((angular.isString(n[t]) && ((n[t] = n[t].trim()), 0 < n[t].length)) || (n[t] = o[t]));
                    else n = angular.copy(o);
                    if (angular.isObject(e.rules) && !angular.isArray(e.rules)) for (t in e.rules) e.rules.hasOwnProperty(t) && i[t] && n[t] && (n[t] = n[t].replace("[[ " + i[t] + " ]]", e.rules[t]));
                    e.messages = n;
                },
            };
        },
    ]),
    angular.module("website.widget.google_recaptcha", ["vcRecaptcha"]).directive("motoWidgetFormElementsRecaptcha", [
        "vcRecaptchaService",
        "$timeout",
        function (o, i) {
            return {
                restrict: "C",
                scope: !0,
                link: function (t, e, n) {
                    (t.setWidgetId = function (e) {
                        t.widgetId = e;
                    }),
                        t.$on("MotoForm::submitSuccess", function () {
                            o.reload(t.widgetId), (t.$FORM[n.fieldName].$invalid = !1), (t.$FORM[n.fieldName].$touched = !1);
                        }),
                        (t.invisibleRecaptchaSuccess = function () {
                            t.onFieldChanged(n.fieldName),
                                i(function () {
                                    t.submitForm();
                                });
                        }),
                        t.$on("MotoForm::submitRejected", function () {
                            "invisible" === o.getInstance(t.widgetId).getAttribute("data-size") && o.execute(t.widgetId);
                        });
                },
            };
        },
    ]),
    angular.module("website.widget.google_search.directive", []).directive("motoWidgetGoogleSearchResultContent", [
        "widget.GoogleSearch.Service",
        "common.elements.PaginatorClass",
        function (o, i) {
            return {
                restrict: "C",
                scope: !0,
                controller: [
                    "$scope",
                    "$attrs",
                    function (n, e) {
                        try {
                            n.settings = JSON.parse(e.settings);
                        } catch (e) {}
                        function t(e) {
                            (n.error = !0), n.Paginator.reset(), (n.resultItems = null);
                        }
                        (n.error = !e.token || !n.settings || !n.settings.searchQuery),
                            n.error ||
                                ((n.Loading = !1),
                                (n.doSearch = function (e) {
                                    (n.Loading = !0),
                                        o
                                            .doSearch({ token: e })
                                            .then(function (e) {
                                                (n.resultItems = e.results.items), n.Paginator.isDataExists() ? n.Paginator.setCurrentPageNumber(e.results.pagination.current) : n.Paginator.setData(e.results.pagination);
                                            }, t)
                                            .catch(t)
                                            .finally(function () {
                                                n.Loading = !1;
                                            });
                                }),
                                (n.Paginator = new i()),
                                n.Paginator.$on("selected", function (e, t) {
                                    n.doSearch(t.token);
                                }),
                                n.doSearch(e.token));
                    },
                ],
            };
        },
    ]),
    angular.module("website.widget.google_search.service", []).service("widget.GoogleSearch.Service", [
        "jsonrpc",
        function (e) {
            var t = e.newService("Widget.GoogleSearch");
            (this.doSearch = t.createMethod("doSearch")), (this.getApiPath = e.getBasePath);
        },
    ]),
    angular.module("website.widget.integrations.acuity_scheduling", []).directive("motoAcuitySchedulingButton", [
        function () {
            return {
                restrict: "A",
                scope: !0,
                link: function (e) {
                    e.openAcuitySchedulingPopup = function (e) {
                        var t =
                            '<div class="moto-popup_content" style="background: white;"><iframe src="' +
                            e +
                            '" width="100%" height="800" frameBorder="0"></iframe><script src="https://d3gxy7nm8y4yjr.cloudfront.net/js/embed.js" type="text/javascript"></script></div>';
                        $.magnificPopup.close(),
                            $.magnificPopup.open({
                                items: { src: $(t), type: "inline" },
                                mainClass: "moto-popup",
                                closeOnBgClick: !1,
                                closeMarkup: '<button title="%title%" type="button" class="mfp-close fa fa-times"></button>',
                                callbacks: {
                                    open: function () {
                                        $(".mfp-content").css("width", "900px");
                                    },
                                },
                            });
                    };
                },
            };
        },
    ]),
    angular.module("website.widget.integrations.airbnb", []).directive("motoWidgetIntegrationsAirbnb", [
        "motoDependencyService",
        function (t) {
            return {
                restrict: "AC",
                link: function () {
                    try {
                        window.AirbnbAPI.bootstrap();
                    } catch (e) {
                        t.require("airbnb_embed");
                    }
                },
            };
        },
    ]),
    angular.module("website.widget.integrations", ["website.widget.integrations.acuity_scheduling", "website.widget.integrations.airbnb", "website.widget.integrations.opentable"]),
    angular.module("website.widget.integrations.opentable", []).directive("motoWidgetIntegrationsOpentableLoader", [
        function () {
            var o = [],
                n = !1;
            function i() {
                var e, t;
                o.length && !n && ((n = !0), (e = o.shift()), ((t = document.createElement("script")).src = e.src), t.addEventListener("load", r), e.$element[0].appendChild(t));
            }
            function r() {
                (n = !1), i();
            }
            return {
                restrict: "C",
                scope: !0,
                link: function (e, t, n) {
                    o.push({ src: n.src, $element: t }), i();
                },
            };
        },
    ]),
    (jQuery.fn.motoCallback = function () {
        var e = this,
            t = e.find(".moto-widget-callback__open-button"),
            n = e.find(".moto-widget-callback__close-button"),
            o = e.find(".moto-widget-callback__more-details-button"),
            i = e.find(".moto-widget-callback__more-details-wrapper"),
            r = e.find(".moto-widget-callback__body"),
            a = 400;
        t.on("click", function () {
            e.hasClass("moto-widget-callback_opened") ||
                e.hasClass("moto-widget-callback_opening") ||
                e.hasClass("moto-widget-callback_closing") ||
                (e.removeClass("moto-widget-callback_closed"),
                e.addClass("moto-widget-callback_opening"),
                r.animate({ width: 280 }, a / 2, function () {
                    t.slideUp(a / 2),
                        r.slideDown(a / 2, function () {
                            e.removeClass("moto-widget-callback_opening"), e.addClass("moto-widget-callback_opened");
                        });
                }));
        }),
            n.on("click", function () {
                e.hasClass("moto-widget-callback_closed") ||
                    e.hasClass("moto-widget-callback_opening") ||
                    e.hasClass("moto-widget-callback_closing") ||
                    (e.removeClass("moto-widget-callback_opened"),
                    e.addClass("moto-widget-callback_closing"),
                    t.slideDown(a),
                    r.slideUp(a, function () {
                        e.removeClass("moto-widget-callback_closing"), e.addClass("moto-widget-callback_closed");
                    }));
            }),
            o.on("click", function () {
                r.hasClass("moto-widget-callback__body_more-details-opened") ? (i.slideUp(a), r.removeClass("moto-widget-callback__body_more-details-opened")) : (i.slideDown(a), r.addClass("moto-widget-callback__body_more-details-opened"));
            });
    }),
    angular.module("website.widgets").directive("motoWebsitePagination", [
        "common.elements.PaginatorClass",
        function (i) {
            return {
                restrict: "A",
                replace: !0,
                templateUrl: function (e, t) {
                    return angular.isString(t.templateUrl) && 5 < t.templateUrl.length ? t.templateUrl : "@websiteWidgets/pagination/template.ng.html";
                },
                scope: { Paginator: "=paginator" },
                link: function (e, t, n) {
                    var o = angular.noop;
                    return (
                        !!e.Paginator &&
                        (e.Paginator instanceof i
                            ? void e.$on("$destroy", function () {
                                  o && (o(), (o = null));
                              })
                            : ((e.Paginator = null), !1))
                    );
                },
            };
        },
    ]),
    (function (l) {
        var e = ">.moto-widget-tabs__wrapper>.moto-widget-tabs__items-wrapper>.moto-widget-tabs__item",
            o = ">.moto-widget-tabs__wrapper>.moto-widget-tabs__headers-wrapper>.moto-widget-tabs__header",
            t = o + ",>.moto-widget-tabs__wrapper>.moto-widget-tabs__items-wrapper>.moto-widget-tabs__item>.moto-widget-tabs__header",
            c = "moto-widget-tabs__header_opened",
            u = l(window);
        function d(e, t) {
            var n = {};
            return (
                (n.id = e),
                (n.$root = t.find("#" + e)),
                (n.$desktopHeader = t.find(o + '[data-tab="' + e + '"]')),
                (n.$mobileHeader = n.$root.find(">.moto-widget-tabs__header")),
                (n.$contentWrapper = n.$root.find(">.moto-widget-tabs__content-wrapper")),
                n
            );
        }
        function m(e, t) {
            e.$contentWrapper.show(),
                e.$desktopHeader.addClass(c),
                e.$mobileHeader.addClass(c),
                (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 1040 && l("html, body").animate({ scrollTop: e.$mobileHeader.offset().top }, 400),
                t && t(e);
        }
        l.fn.motoTabs = function (r) {
            var a = this,
                s = a.find(">.moto-widget-tabs__wrapper>.moto-widget-tabs__headers-wrapper>.moto-widget-tabs__header.moto-widget-tabs__header_opened").data("tab");
            "object" !== _typeof(r) && (r = {}),
                a.find(e).length &&
                    (a.find(e + ":not(#" + s + ")").each(function () {
                        r.onClosed && r.onClosed({ id: l(this).attr("id") });
                    }),
                    r.onOpened && r.onOpened({ id: s }),
                    a.off("click", t),
                    a.on("click", t, function (e) {
                        var t,
                            n,
                            o,
                            i = l(e.currentTarget).data("tab");
                        i !== s && ((t = d(s, a)), (n = t), (o = r.onClosed), n.$contentWrapper.hide(), n.$desktopHeader.removeClass(c), n.$mobileHeader.removeClass(c), o && o(n), m((t = d((s = i), a)), r.onOpened), u.resize());
                    }));
        };
    })(jQuery),
    angular.module("website.widget.tabs").directive("motoWidgetTabsItem", [
        "website.WidgetsRepository",
        function (n) {
            return {
                restrict: "C",
                scope: !0,
                compile: function (e) {
                    var t = n.registry(e);
                    return {
                        pre: function (e) {
                            t.setScope(e);
                        },
                    };
                },
            };
        },
    ]),
    angular.module("website.widget.tabs").directive("motoWidgetTabs", [
        "website.WidgetsRepository",
        function (n) {
            var o = { startAnimation: "onArriving" };
            return {
                restrict: "C",
                scope: !0,
                compile: function (e) {
                    var t = n.registry(e);
                    return {
                        pre: function (e) {
                            t.setScope(e);
                        },
                        post: function () {
                            e.motoTabs({
                                onOpened: function (e) {
                                    t.getChild(e.id).onArriving(o), t.getChild(e.id).onArrived(o);
                                },
                                onClosed: function (e) {
                                    t.getChild(e.id).onVanishing(), t.getChild(e.id).onVanished();
                                },
                            });
                        },
                    };
                },
            };
        },
    ]),
    (function (h) {
        h.fn.tileGallery = function () {
            var t = {
                    ITEM_WRAPPER: "moto-widget-tile-gallery__item-wrapper",
                    ITEM_IMAGE: "moto-widget-tile-gallery__item-image",
                    BODY_PREVIEW_CONTENT_MODIFIER: "moto-preview-mode_content",
                    BODY_PREVIEW_DESIGN_MODIFIER: "moto-preview-mode_design",
                },
                e = 250,
                r = { columns: [], margins: 0 },
                i = this,
                a = i.children("." + t.ITEM_WRAPPER),
                n = !1,
                o = !1,
                s = angular.isDefined(i.data("tileGalleryJustifyHeight")),
                l = i.closest(".moto-widget-tile-gallery");
            function c() {
                return r.columns.reduce(function (e, t) {
                    return t.heightWithPadding > e ? t.heightWithPadding : e;
                }, 0);
            }
            function u(e) {
                e.css("margin-bottom", "")
                    .find("." + t.ITEM_IMAGE)
                    .css("width", "");
            }
            function d(e) {
                return e.children().innerHeight();
            }
            function m() {
                var e,
                    t,
                    n,
                    o,
                    i = h(a[0]);
                for (r.margins = parseInt(i.css("padding-bottom")), r.columns = [{ items: [i], heightWithPadding: i.innerHeight(), height: d(i) }], t = 1; t < a.length; t++)
                    (e = h(a[t])).position().left > i.position().left
                        ? ((o = e), r.columns.push({ items: [o], heightWithPadding: o.innerHeight(), height: d(o) }))
                        : ((n = e), r.columns[r.columns.length - 1].items.push(n), (r.columns[r.columns.length - 1].heightWithPadding += n.innerHeight()), (r.columns[r.columns.length - 1].height += d(n))),
                        (i = e);
            }
            function g(e) {
                e.find("." + t.ITEM_IMAGE).css("width", this.newWidth + "%");
            }
            function p() {
                var t, n, o;
                i.parent().css("height", ""),
                    r.columns.forEach(function (e) {
                        e.items.forEach(u);
                    }),
                    m(),
                    s &&
                        ((o = c()),
                        r.columns.forEach(function (e) {
                            (t = o - (e.heightWithPadding - e.height)), (n = ((t / e.height) * 100).toFixed(1)), e.items.forEach(g, { newWidth: n });
                        }),
                        m()),
                    i.parent().css("height", c() - r.margins + "px");
            }
            function f() {
                n
                    ? (o = !0)
                    : (p(),
                      (o = !(n = !0)),
                      setTimeout(function () {
                          (n = !1), o && f();
                      }, e));
            }
            f(),
                l.one("motoWidgetIsFullyLoaded", function () {
                    f();
                }),
                l.on("motoWidgetItemLoaded", function () {
                    f();
                }),
                (h("body").hasClass(t.BODY_PREVIEW_CONTENT_MODIFIER) && !h("body").hasClass(t.BODY_PREVIEW_DESIGN_MODIFIER)) || h(window).on("resize", f);
        };
    })(jQuery),
    angular.module("website.widgets.templates", ["@websiteWidgets/form_elements/moto_form_errors.ng.html", "@websiteWidgets/pagination/template.ng.html"]),
    angular.module("@websiteWidgets/form_elements/moto_form_errors.ng.html", []).run([
        "$templateCache",
        function (e) {
            e.put(
                "@websiteWidgets/form_elements/moto_form_errors.ng.html",
                '<div class="moto-form__errors-items" data-ng-cloak ng-if="($FORM.$submitted || $FORM[fieldName].$touched) && $FORM[fieldName].$invalid">\n    <div class="moto-form__error-item moto-form__error-item_required" ng-if="$FORM[fieldName].$error.required">{{ ::messages.required }}</div>\n    <div class="moto-form__error-item moto-form__error-item_minlength" ng-if="$FORM[fieldName].$error.minlength">{{ ::messages.minlength }}</div>\n    <div class="moto-form__error-item moto-form__error-item_maxlength" ng-if="$FORM[fieldName].$error.maxlength">{{ ::messages.maxlength }}</div>\n    <div class="moto-form__error-item moto-form__error-item_email" ng-if="$FORM[fieldName].$error.email">{{ ::messages.email }}</div>\n    <div class="moto-form__error-item moto-form__error-item_number" ng-if="$FORM[fieldName].$error.number">{{ ::messages.number }}</div>\n    <div class="moto-form__error-item moto-form__error-item_min" ng-if="$FORM[fieldName].$error.min">{{ ::messages.min }}</div>\n    <div class="moto-form__error-item moto-form__error-item_max" ng-if="$FORM[fieldName].$error.max">{{ ::messages.max }}</div>\n    <div class="moto-form__error-item moto-form__error-item_url" ng-if="$FORM[fieldName].$error.url">{{ ::messages.url }}</div>\n    <div class="moto-form__error-item moto-form__error-item_max-file-size" ng-if="$FORM[fieldName].$error.maxSize">{{ ::messages.maxFileSize }}</div>\n    <div class="moto-form__error-item moto-form__error-item_file-extension" ng-if="fieldType === \'file\' && $FORM[fieldName].$error.pattern">{{ ::messages.fileExtension }}</div>\n    <div class="moto-form__error-item moto-form__error-item_date" ng-if="fieldType === \'date\' && $FORM[fieldName].$error.date">{{ ::messages.date }}</div>\n\n    \x3c!-- @TODO : need add tel validator, because user can enter pattern --\x3e\n    <div class="moto-form__error-item moto-form__error-item_tel" ng-if="fieldType === \'tel\' && $FORM[fieldName].$error.pattern">{{ ::messages.tel }}</div>\n    <div class="moto-form__error-item moto-form__error-item_pattern" ng-if="fieldType === \'text\' && $FORM[fieldName].$error.pattern">{{ ::messages.pattern }}</div>\n</div>\n'
            );
        },
    ]),
    angular.module("@websiteWidgets/pagination/template.ng.html", []).run([
        "$templateCache",
        function (e) {
            e.put(
                "@websiteWidgets/pagination/template.ng.html",
                '<div ng-if="Paginator" class="moto-widget moto-widget-pagination moto-preset-default clearfix" data-widget="pagination" data-preset="default">\n\n    <ul ng-if="Paginator.currentNumber > Paginator.firstNumber" class="moto-pagination-group moto-pagination-group-controls moto-pagination-group_left">\n        <li class="moto-pagination-item moto-pagination-item-control moto-pagination-item-control_first">\n            <a ng-href="{{ Paginator.first.getLink() }}" ng-click="Paginator.selectPage(Paginator.first);" class="moto-pagination-link"><i class="moto-pagination-link-icon moto-pagination-link-text fa fa-angle-double-left"></i></a>\n        </li>\n        <li class="moto-pagination-item moto-pagination-item-control moto-pagination-item-control_previous">\n            <a ng-href="{{ Paginator.previous.getLink() }}" ng-click="Paginator.selectPage(Paginator.previous);" class="moto-pagination-link"><i class="moto-pagination-link-icon moto-pagination-link-text fa fa-angle-left"></i></a>\n        </li>\n    </ul>\n\n    <ul class="moto-pagination-group moto-pagination-group_pages">\n        <li class="moto-pagination-item moto-pagination-item-page" ng-repeat="Page in Paginator.pagesInRange">\n            <span ng-if="Page.number === Paginator.currentNumber"\n                  class="moto-pagination-link moto-pagination-link_active"><span class="moto-pagination-link-text">{{ Page.number }}</span></span>\n            <a ng-if="Page.number !== Paginator.currentNumber" ng-href="{{ ::Page.getLink() }}" ng-click="Paginator.selectPage(Page);" class="moto-pagination-link"><span class="moto-pagination-link-text">{{ Page.number }}</span></a>\n        </li>\n    </ul>\n\n    <ul ng-if="Paginator.currentNumber < Paginator.lastNumber" class="moto-pagination-group moto-pagination-group-controls moto-pagination-group_right">\n        <li class="moto-pagination-item moto-pagination-item-control moto-pagination-item-control_next">\n            <a ng-href="{{ Paginator.next.getLink() }}" ng-click="Paginator.selectPage(Paginator.next);" class="moto-pagination-link"><i class="moto-pagination-link-icon moto-pagination-link-text fa fa-angle-right"></i></a>\n        </li>\n        <li class="moto-pagination-item moto-pagination-item-control moto-pagination-item-control_last">\n            <a ng-href="{{ Paginator.last.getLink() }}" ng-click="Paginator.selectPage(Paginator.last);" class="moto-pagination-link"><i class="moto-pagination-link-icon moto-pagination-link-text fa fa-angle-double-right"></i></a>\n        </li>\n    </ul>\n\n</div>\n'
            );
        },
    ]);
