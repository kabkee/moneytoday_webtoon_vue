import HomePage from './pages/home.vue';
import AboutPage from './pages/about.vue';
import ToonsPage from './pages/toons.vue';
import ToonPage from './pages/toon.vue';
import ChapterPage from './pages/chapter.vue';
import FormPage from './pages/form.vue';
// import DynamicRoutePage from './pages/dynamic-route.vue';
import NotFoundPage from './pages/not-found.vue';

import PanelLeftPage from './pages/panel-left.vue';
import PanelRightPage from './pages/panel-right.vue';

export default [{
        path: '/',
        component: HomePage,
    },
    {
        path: '/panel-left',
        component: PanelLeftPage,
    },
    {
        path: '/panel-right',
        component: PanelRightPage,
    },
    {
        path: '/about',
        component: AboutPage,
    },
    {
        path: '/toons',
        component: ToonsPage,
    },
    {
        path: '/form',
        component: FormPage,
    },
    // {
    //     path: '/dynamic-route/blog/:blogId/post/:postId',
    //     component: DynamicRoutePage,
    // },
    {
        path: '/toon/:toonId',
        component: ToonPage,
    },
    {
        path: '/toon/:toonId/chapter/:chapterId',
        component: ChapterPage,
    },
    {
        path: '(.*)',
        component: NotFoundPage,
    },
];
