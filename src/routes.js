import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import ToonsPage from './pages/toons.vue';
import ToonPage from './pages/toon.vue';
import LoginPage from './pages/login.vue';
import ChapterPage from './pages/chapter.vue';
import NotFoundPage from './pages/not-found.vue';
import PanelLeftPage from './pages/panel-left.vue';
import { localStorage } from './plugins/localStorage';
// import PanelRightPage from './pages/panel-right.vue';

function checkAuth(to, from, resolve, reject) {
    const router = this;
    if (localStorage.available("localStorage")) {
        let authed = localStorage.getAuthed();
        authed = authed ? parseInt(authed) : 0;
        if (authed) {
            resolve();
        } else {
            reject();
            router.navigate('/login', {
                props: {
                    to
                }
            });
            return;
        }
    } else {
        reject();
        router.navigate('/login', {
            props: {
                to
            }
        });
        return;
    }
}

function checkAuthInLogin(to, from, resolve, reject) {
    const router = this;
    if (localStorage.available("localStorage")) {
        let authed = localStorage.getAuthed();
        authed = authed ? parseInt(authed) : 0;
        if (authed) {
            reject();
            router.navigate('/');
            return;
        } else {
            resolve();
        }
    } else {
        resolve();
    }
};

function logOut() {
    const router = this;
    if (localStorage.available('localStorage')) {
        localStorage.logout();
    }
    router.navigate('/login');
}

export default [{
        path: '/',
        component: HomePage,
        beforeEnter: checkAuth,
    },
    {
        path: '/login',
        component: LoginPage,
        beforeEnter: checkAuthInLogin,
    },
    {
        path: '/logout',
        beforeEnter: logOut,
    },
    {
        path: '/panel-left',
        component: PanelLeftPage,
    },
    // {
    //     path: '/panel-right',
    //     component: PanelRightPage,
    // },
    {
        path: '/about',
        component: AboutPage,
        beforeEnter: checkAuth,
    },
    {
        path: '/toons',
        component: ToonsPage,
        beforeEnter: checkAuth,
    },
    // {
    //     path: '/dynamic-route/blog/:blogId/post/:postId',
    //     component: DynamicRoutePage,
    // },
    {
        path: '/toon/:toonId',
        component: ToonPage,
        beforeEnter: checkAuth,
    },
    {
        path: '/toon/:toonId/chapter/:chapterId',
        component: ChapterPage,
        beforeEnter: checkAuth,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];
