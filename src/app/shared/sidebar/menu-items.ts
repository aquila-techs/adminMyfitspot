import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/dashboard/classic',
        title: 'Dashboard',
        icon: 'mdi mdi-view-dashboard',
        class: '', //has-arrow
        extralink: false,
        submenu: []
    },
    {
        path: '',
        title: 'Posts',
        icon: 'mdi mdi-pin',
        class: 'has-arrow',
        extralink: false,
        submenu: [
            {
                path: '/post/all',
                title: 'All Posts',
                icon: 'mdi mdi-twitch',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/post/categories',
                title: 'Categories',
                icon: 'mdi mdi-apps',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/post/tags',
                title: 'Tags',
                icon: 'mdi mdi-tag-multiple',
                class: '',
                extralink: false,
                submenu: []
            }

        ]
    },
    {
        path: '',
        title: 'Recipes',
        icon: 'mdi mdi-food',
        class: 'has-arrow',
        extralink: false,
        submenu: [
            {
                path: '/recipes/addcarbs',
                title: 'Carbs',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/recipes/addfats',
                title: 'Fats',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/recipes/addfruits',
                title: 'Fruits',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/recipes/addherbs',
                title: 'Herbs',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/recipes/addprotein',
                title: 'Protein',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/recipes/addvegetables',
                title: 'Vegetables',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/recipes/addalcoholicbeverages',
                title: 'Add Alcoholic Beverages',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
        ]
    },
    {
        path: '',
        title: 'WorkOut',
        icon: 'mdi mdi-dumbbell',
        class: 'has-arrow', //has-arrow
        extralink: false,
        submenu: [
            {
                path: '/workout/all',
                title: 'All Workouts',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '/workout/addworkout',
                title: 'Add Workout',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            },
            {
                path: '',
                title: 'Muscle Group (EN)',
                icon: 'mdi mdi-adjust',
                class: 'has-arrow',
                extralink: false,
                submenu: [
                    {
                        path: '/workout/quadriceps',
                        title: 'Quadriceps',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/glutes',
                        title: 'Glutes',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/hamstring',
                        title: 'Hamstring',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/chest',
                        title: 'Chest',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/lats',
                        title: 'Lats',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/shoulder',
                        title: 'Shoulder',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },{
                        path: '/workout/biceps',
                        title: 'Biceps',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/triceps',
                        title: 'Triceps',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/core',
                        title: 'Core',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/calfs',
                        title: 'Calfs',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/upperTraps',
                        title: 'Upper Traps',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/bag',
                        title: 'Bag',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    },
                    {
                        path: '/workout/mobility',
                        title: 'Mobility',
                        icon: '',
                        class: '',
                        extralink: false,
                        submenu: []
                    }
                    // {
                    //     path: '/recipes/addrecipe',
                    //     title: 'Add Recipe',
                    //     icon: 'mdi mdi-adjust',
                    //     class: '',
                    //     extralink: false,
                    //     submenu: []
                    // },
                ]
            }
        ]
    },
    {
        path: '',
        title: 'Product',
        icon: 'mdi mdi-food-variant',
        class: 'has-arrow', //has-arrow
        extralink: false,
        submenu: [
            {
                path: '/product',
                title: 'Add Product',
                icon: 'mdi mdi-adjust',
                class: '',
                extralink: false,
                submenu: []
            }
        ]
    },
    // {
    //     path: '/profile',
    //     title: 'Profile',
    //     icon: 'mdi mdi-account-network',
    //     class: '', //has-arrow
    //     extralink: false,
    //     submenu:[]
    // }
    // {
    //     path: '/users',
    //     title: 'Users',
    //     icon: 'mdi mdi-account-multiple',
    //     class: '',
    //     extralink: false,
    //     submenu: []
    // },


];
