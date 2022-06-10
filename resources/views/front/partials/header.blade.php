<div id="header-mobile">
    <div id="burger">
        <div class="iconBar"></div>
    </div>
    <a href="/" class="logo">
        <img src="/CL-horizontal_on_transparent.png" alt=""/>
    </a>
</div>
<header>
    <div class="container">
        <div class="row">
            <div class="col-lg-auto col-12 header-left">
                <a href="/" class="logo">
                    <img src="/CL-horizontal_on_transparent.png" alt=""/>
                </a>
            </div>
            <div class="col-lg-auto col-12 header-center">
                <ul id="menu-list">
                    <li>
                        <a href="#"><span>Catalog</span></a>
                        <ul>
                            @foreach ($categoriesMenu as $key => $category)
                                <li>
                                    <a href="{{ url('/'.$lang->lang.'/catalog/'. $category->alias) }}">{{ $category->translation->name }}</a>
                                    @if ($category->children->count() > 0)
                                        <ul>
                                            @foreach ($category->children as $key => $child)
                                                <li>
                                                    <a href="{{ url('/'.$lang->lang.'/catalog/'. $child->alias) }}">
                                                        {{ $child->translation->name }}
                                                    </a>
                                                </li>
                                            @endforeach
                                        </ul>
                                    @endif
                                </li>
                            @endforeach
                        </ul>
                    </li>
                    <li><a href="{{ url('/'.$lang->lang.'/faq') }}">FAQ</a></li>
                    <li><a href="{{ url('/'.$lang->lang.'/about') }}">About</a></li>
                    <li><a href="{{ url('/'.$lang->lang. '/propose-book') }}">Submit a Book Proposal</a></li>
                </ul>
            </div>
            <div class="col-lg-auto col-12">
                <div class="header-right">
                    <div id="lang-button" data-toggle="modal" data-target="#settings-modal">
                        <span>{{ $lang->lang }}</span>
                        <svg
                                width="14px"
                                height="8px"
                                viewBox="0 0 14 8"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                            <title>Path</title>
                            <desc>Created with Sketch.</desc>
                            <defs>
                                <linearGradient x1="100%" y1="50%" x2="-156.127489%" y2="50%" id="linearGradient-1">
                                    <stop stop-color="#DFA1D5" offset="0%"></stop>
                                    <stop stop-color="#005691" offset="100%"></stop>
                                </linearGradient>
                            </defs>
                            <g id="Site" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g
                                        class="arrow-svg header-right-svg"
                                        id="Main-Page"
                                        transform="translate(-1246.000000, -117.000000)"
                                        fill="url(#linearGradient-1)"
                                >
                                    <g id="Header" transform="translate(-24.000000, -72.000000)">
                                        <g id="Group-18" transform="translate(351.000000, 0.000000)">
                                            <g id="Group-5">
                                                <g
                                                        id="left-arrow-2-copy"
                                                        transform="translate(1041.500000, 193.000000) rotate(-90.000000) translate(-1041.500000, -193.000000) translate(1014.500000, 42.500000)"
                                                >
                                                    <g id="left-arrow">
                                                        <g id="Group-3">
                                                            <path
                                                                    d="M25.6793961,35.0029593 L30.756803,29.7653659 C30.8966099,29.6214959 30.9735202,29.4291382 30.9735202,29.2240325 C30.9735202,29.018813 30.8966099,28.8265691 30.756803,28.6824715 L30.3118926,28.2237724 C30.1723064,28.0794472 29.9857133,28 29.7868719,28 C29.5880305,28 29.4016581,28.0794472 29.2619616,28.2237724 L23.2164995,34.4595772 C23.0762512,34.6041301 22.9994512,34.7972846 23,35.0026179 C22.9994512,35.2088618 23.0761409,35.4017886 23.2164995,35.5464553 L29.256334,41.7762276 C29.3960305,41.9205528 29.582403,42 29.7813547,42 C29.9801961,42 30.1665685,41.9205528 30.3063754,41.7762276 L30.7511754,41.3175285 C31.0406099,41.0189756 31.0406099,40.5329593 30.7511754,40.2345203 L25.6793961,35.0029593 Z"
                                                                    id="Path"
                                                            ></path>
                                                        </g>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                        <ul>
                            @php
                                $url = '';
                                if (request()->path()) {
                                    $url = substr(request()->path(), 2);
                                }
                            @endphp

                            <li><a href="{{ url('/en'.$url) }}">EN</a></li>
                            <li><a href="{{ url('/ro'.$url) }}">RO</a></li>
                            <li><a href="{{ url('/ru'.$url) }}">RU</a></li>
                        </ul>
                    </div>
                    <div id="profile" data-toggle="modal" data-target="#register" data-toggle="tooltip"
                         data-placement="top" title="Near Login">
                        <near-log-in></near-log-in>
                    </div>
                    <div id="search" data-toggle="modal" data-target="#search-modal">
                        <span>Search</span>
                        <svg
                                viewBox="0 0 17 17"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                        >
                            <g id="Site" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g
                                        class="search-svg header-right-svg"
                                        id="Home_Page_Hasdeu-Copy"
                                        transform="translate(-1626.000000, -36.000000)"
                                        fill="#363636"
                                        fill-rule="nonzero"
                                >
                                    <g id="Header" transform="translate(1.000000, -5.000000)">
                                        <g
                                                id="left-arrow-2-copy-2"
                                                transform="translate(1601.000000, 48.500000) rotate(-90.000000) translate(-1601.000000, -48.500000) translate(1591.000000, 8.000000)"
                                        >
                                            <g id="left-arrow" transform="translate(0.000000, 0.000000)">
                                                <g id="Group-3" transform="translate(0.000000, 0.000000)">
                                                    <g
                                                            id="search"
                                                            transform="translate(9.000000, 73.000000) scale(-1, 1) translate(-9.000000, -73.000000) translate(1.000000, 65.000000)"
                                                    >
                                                        <path
                                                                d="M11.4351201,10.0629074 L10.7078473,10.0629074 L10.4562607,9.81132075 C11.3527873,8.77302744 11.8924957,7.42367067 11.8924957,5.9462693 C11.8924957,2.66209262 9.23040309,0 5.9462693,0 C2.66213551,0 0,2.66209262 0,5.9462693 C0,9.23044597 2.66209262,11.8925386 5.9462693,11.8925386 C7.42367067,11.8925386 8.77302744,11.3527873 9.81132075,10.4608491 L10.0629074,10.7124357 L10.0629074,11.4351201 L14.6369211,16 L16,14.6369211 L11.4351201,10.0629074 Z M6,10 C3.791125,10 2,8.208875 2,6 C2,3.791125 3.791125,2 6,2 C8.208875,2 10,3.791125 10,6 C10,8.208875 8.208875,10 6,10 Z"
                                                                id="Shape"
                                                        ></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header>
