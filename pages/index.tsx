import { useState, useCallback, useEffect } from 'react'
import { getStores } from "../utils/app";
import { getMarkers, getStoreBrands, getStoreProductCategories } from "../utils/store"
import { getStoreLikes, getStoreFollowers } from '../utils/like';
import Stores from "../components/home/Stores";
import Filter from "../components/home/Filter";
import MapComponent from '../components/home/Map';
import Link from 'next/link';
import { getFilters } from '../utils/filters';

export async function getStaticProps() {
    const res = await getStores().then((res: any) => {
        if (res) {
            res.forEach(async (res: any) => {
                //res.likes = await getStoreLikes(res.store_id)
                //res.followers = await getStoreFollowers(res.store_id)
                const brands = await getStoreBrands(res.store_id)
                const categories = await getStoreProductCategories(res.store_id)
                if (brands) {
                    res.brands = brands.map((b) => b.brand)
                }
                if (categories) {
                    res.categories = categories.map((c) => c.product_category)
                }
            })
        }
        return res
    })
    const markers = await getMarkers()
    const filters = await getFilters(11898)
    if (res) {
        return {
            props: {
                stores: res,
                filters: filters,
                markers: markers
            },
        }
    }
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const projects = [
    { name: "Santé et bien-être", bgColor: "bg-v-teal" },
    { name: "Vêtements et accessoires", bgColor: "bg-v-purple" },
    { name: "Maison, déco et extérieur", bgColor: "bg-v-green" },
    { name: "Alimentation et boisson", bgColor: "bg-v-dbrown" },
    { name: "Loisirs, art et culture", bgColor: "bg-v-blue" },
    { name: "Services publiques", bgColor: "bg-v-pink" },
    { name: "Luxe", bgColor: "bg-v-lbrown" },
    { name: "Magasins virtuels", bgColor: "bg-green-500" },
];

export default function Home({ stores, filters, markers }: any) {
    const [filteredStores, setFilteredStores] = useState([])
    const [activeFilters, setActiveFilters] = useState<any>([])
    const [readMore, setReadMore] = useState<boolean>(false)

    useEffect(() => {
        stores.forEach(async (store: any) => {
            const likes = await getStoreLikes(store.store_id)
            const followers = await getStoreFollowers(store.store_id)
            store.likes = likes
            store.followers = followers
        })
        setFilteredStores(stores)
    }, [stores])

    const handleCheck = useCallback((option: any) => {
        option.checked = !option.checked;
        if (option.checked) {
            setActiveFilters([...activeFilters, option]);
        }

        if (!option.checked) {
            setActiveFilters(
                activeFilters.filter((filter: any) => filter !== option)
            );
        }
    }, [activeFilters, setActiveFilters]);

    const handleRemove = (option: any) => {
        option.checked = false;
        setActiveFilters(activeFilters.filter((filter: any) => filter !== option));
    };
    useEffect(() => {
        // if activeFilters.length is 0, then setFilteredStores to stores
        if (activeFilters.length === 0) {
            setFilteredStores(stores);
        }

        let brandAndCategory = false;
        let storeAndCategory = false;
        let storeAndBrand = false;
        let storeOnly = false;
        let brandOnly = false;
        let categoryOnly = false;
        let storeAndBrandAndCategory = false;
        const storeType = activeFilters.filter(
            (filter: any) => filter.type === "store"
        );
        const brandType = activeFilters.filter(
            (filter: any) => filter.type === "brand"
        );
        const categoryType = activeFilters.filter(
            (filter: any) => filter.type === "product"
        );

        if (
            storeType.length > 0 &&
            brandType.length > 0 &&
            categoryType.length > 0
        ) {
            storeAndBrandAndCategory = true;
        } else if (storeType.length > 0 && brandType.length > 0) {
            storeAndBrand = true;
        } else if (storeType.length > 0 && categoryType.length > 0) {
            storeAndCategory = true;
        } else if (brandType.length > 0 && categoryType.length > 0) {
            brandAndCategory = true;
        } else if (storeType.length > 0) {
            storeOnly = true;
        } else if (brandType.length > 0) {
            brandOnly = true;
        } else if (categoryType.length > 0) {
            categoryOnly = true;
        }
        if (storeOnly) {
            setFilteredStores(
                stores.filter((store: any) =>
                    // check if any of the storeOnly.store_id array contains the store.store_id
                    storeType.some((storeOnly: any) =>
                        storeOnly.store_id.includes(store.store_id)
                    )
                )
            );
        }
        if (brandOnly) {
            setFilteredStores(
                stores.filter((store: any) =>
                    // check if any of the brandOnly.value is included in the store.brands array
                    brandType.some((brandOnly: any) => {
                        if (store.brands !== undefined) {
                            return store.brands.includes(brandOnly.value)
                        }
                    })
                )
            );
        }
        if (categoryOnly) {
            setFilteredStores(
                stores.filter((store: any) => {
                    // check if any of the categoryOnly.value is included in the store.categories array
                    return categoryType.some((categoryOnly: any) => {
                        if (store.categories !== undefined) {
                            return store.categories.includes(categoryOnly.value)
                        }
                    }
                    );
                })
            );
        }
        if (storeAndBrand) {
            setFilteredStores(
                stores.filter((store: any) => {
                    return (
                        storeType.some((storeAndBrand: any) =>
                            storeAndBrand.store_id.includes(store.store_id)
                        ) &&
                        brandType.some((storeAndBrand: any) =>
                            store.brands.includes(storeAndBrand.value)
                        )
                    );
                })
            );
        }
        if (storeAndCategory) {
            setFilteredStores(
                stores.filter((store: any) => {
                    return (
                        storeType.some((storeAndCategory: any) =>
                            storeAndCategory.store_id.includes(store.store_id)
                        ) &&
                        categoryType.some((storeAndCategory: any) =>
                            store.categories.includes(storeAndCategory.value)
                        )
                    );
                })
            );
        }
        if (brandAndCategory) {
            setFilteredStores(
                stores.filter((store: any) => {
                    if (store.brands && store.categories !== undefined) {
                        return (
                            brandType.some((brandAndCategory: any) =>
                                store.brands.includes(brandAndCategory.value)
                            ) &&
                            categoryType.some((brandAndCategory: any) =>
                                store.categories.includes(brandAndCategory.value)
                            )
                        );
                    }
                })
            );
        }
        if (storeAndBrandAndCategory) {
            setFilteredStores(
                stores.filter((store: any) => {
                    return (
                        storeType.some((storeAndBrandAndCategory: any) =>
                            storeAndBrandAndCategory.store_id.includes(store.store_id)
                        ) &&
                        brandType.some((storeAndBrandAndCategory: any) =>
                            store.brands.includes(storeAndBrandAndCategory.value)
                        ) &&
                        categoryType.some((storeAndBrandAndCategory: any) =>
                            store.categories.includes(storeAndBrandAndCategory.value)
                        )
                    );
                })
            );
        }
    }, [activeFilters, stores]);

    return (
        <main className="bg-neutral-50 space-y-6">
            <div className="px-4 mb-4 mt-12 max-w-7xl mx-auto sm:px-6 text-center lg:px-0 text-gray-700">
                <h1 className="font-bold tracking-tight text-xl sm:text-2xl lg:text-3xl">
                    Bienvenue dans Virtualia Shop, votre centre commercial à ciel ouvert!
                </h1>
                <button onClick={() => setReadMore(!readMore)} className="text-sm mt-4 sm:text-base bg-vol font-medium rounded-full text-white px-3 py-2 md:hidden">en savoir plus</button>
                {readMore && (
                    <div className="md:hidden">
                        <p className="text-sm mt-2 sm:text-base">
                            Plus que cela, c{`'`}est une communauté de boutiques 100% immersives pour vous inciter à acheter près de chez vous,{" "}
                            <br className="hidden lg:block" />
                            afin de faire vivre les centre-villes et être informé des derniers
                            arrivages.
                        </p>
                        <a className="text-xs sm:text-sm underline" href="#comment-ca-marche">
                            Comment ça marche?
                        </a>
                        <i className="mt-4 block mb-4 text-sm sm:text-base">
                            Faîtes partager le concept autour de vous, rejoignez-nous sur <a href="https://www.instagram.com/virtualia.shop/" target="_blank" rel="noreferrer"><span className="text-vol"><strong>Instagram</strong></span></a> et soutenez votre économie
                            locale!
                        </i>
                        <p className="text-sm mt-2 sm:text-base">
                            <span className="text-vol"><i>Actualités! </i></span>{" "}<br></br>
                            Bientôt disponible des produits en réalité augmentée chez Atelier Chez Soi, Bensimon, Bacchini, People Shoes.. les stories pour suivre l{"'"}actualité de vos boutiques préférées, l{"'"}eReservation pour du click and collect sur tous les produits éligibles chez nos partenaires.
                            <br />
                            En janvier, nous mettons en place la livraison à domicile. 🤩<br />
                            Enfin petit rappel, likez les produits et les boutiques qui vous plaisent, ou appuyez sur le panier orange pour être notifié de leurs nouveaux produits. Chaque point de fidélité collecté ce sont des lots et du cashback à empocher!</p>
                    </div>
                )}
                <div className="hidden md:block">
                    <p className="text-sm mt-2 sm:text-base">
                        Plus que cela, c{`'`}est une communauté de boutiques 100% immersives pour vous inciter à acheter près de chez vous,{" "}
                        <br className="hidden lg:block" />
                        afin de faire vivre les centre-villes et être informé des derniers
                        arrivages.
                    </p>
                    <a className="text-xs sm:text-sm underline" href="#comment-ca-marche">
                        Comment ça marche?
                    </a>
                    <i className="mt-4 block mb-4 text-sm sm:text-base">
                        Faîtes partager le concept autour de vous, rejoignez-nous sur <a href="https://www.instagram.com/virtualia.shop/" target="_blank" rel="noreferrer"><span className="text-vol"><strong>Instagram</strong></span></a> et soutenez votre économie
                        locale!
                    </i>
                    <p className="text-sm mt-2 sm:text-base">
                        <span className="text-vol"><i>Actualités! </i></span>{" "}<br></br>
                        Bientôt disponible des produits en réalité augmentée chez Atelier Chez Soi, Bensimon, Bacchini, People Shoes.. les stories pour suivre l{"'"}actualité de vos boutiques préférées, l{"'"}eReservation pour du click and collect sur tous les produits éligibles chez nos partenaires.
                        <br />
                        En janvier, nous mettons en place la livraison à domicile. 🤩<br />
                        Enfin petit rappel, likez les produits et les boutiques qui vous plaisent, ou appuyez sur le panier orange pour être notifié de leurs nouveaux produits. Chaque point de fidélité collecté ce sont des lots et du cashback à empocher!</p>
                </div>
            </div>
            <div className="hidden lg:block">
                <Filter filters={filters} activeFilters={activeFilters} handleRemove={handleRemove} handleCheck={handleCheck} />
            </div>
            <div className="grid grid-cols-6 max-w-7xl mx-auto space-x-2 px-4 lg:px-0">
                <MapComponent markers={markers} stores={filteredStores} />
                <div className="lg:hidden col-span-6 my-8">
                    <Filter filters={filters} activeFilters={activeFilters} handleRemove={handleRemove} handleCheck={handleCheck} />
                </div>
                <Stores stores={filteredStores} />
            </div>
            <div className="mx-auto max-w-7xl bg-white py-4 relative rounded-2xl shadow-md sm:px-6 lg:px-8 my-12">
                <h2 className="text-sm flex gap-2 bg-white font-medium shadow-md text-gray-800 md:absolute top-[-10px] rounded-md p-2 left-12">
                    <span>🛍️</span> Code couleur des magasins virtualisés par catégorie
                </h2>
                <ul
                    role="list"
                    className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 lg:grid-cols-4"
                >
                    {projects.map((project) => (
                        <li key={project.name} className="col-span-1 ml-2 flex items-center">
                            <div
                                className={classNames(
                                    project.bgColor,
                                    "flex-shrink-0 flex items-center justify-center w-4 h-4 text-white text-md rounded-md"
                                )}
                            ></div>
                            <div className="flex flex-1 items-center justify-between truncate">
                                <div className="flex-1 truncate px-4 py-2 text-md">
                                    <p className="text-gray-700">{project.name}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="px-4 text-gray-700 sm:px-16 xl:px-4 max-w-7xl mx-auto">
                <div className="grid grid-rows-1 justify-items-center">
                    <h2 id="comment" className="font-bold text-3xl tracking-tight sm:text-4xl block mb-4">
                        Comment ça marche ?
                    </h2>
                </div>
                <div className="flex sm:justify-center lg:justify-start ">
                    <h3 className="mt-1 mb-4 font-bold tracking-tight text-2xl">
                        1.
                        <span className="text-vol mx-2">Adhérer</span>au programme de fidélité et accumulez des
                        des<span className="text-vol mx-2">points</span>à chaque commande, achat, like et suivi.
                    </h3>
                </div>
                <div className="" id="comment-ca-marche">
                    <p className="">
                        C{"'"}est très simple, accumulez des points en visitant, commandant en ligne ou en achetant
                        dans nos boutiques partenaires.
                    </p>
                    <ul role="list">
                        <li className="mt-2">
                            • Scannez le code QR de chaque boutique, situé au niveau de la
                            caisse (le code QR sur la vitrine n{"'"}est qu{"'"}un lien vers la
                            plateforme) pour accumuler 20 points.
                        </li>
                        <li className="mt-2">
                            • Pour chaque euro dépensé en boutique, gagnez un point de fidélité
                            supplémentaire.
                        </li>
                        <li className="mt-2">
                            • Chassez davantage de codes QR en ville, sur les flyers, nos
                            affiches et autres lieux secrets à découvrir pour cumuler jusqu{"'"}à 10
                            points.
                        </li>
                        <li className="mt-2">
                            • Invitez un ami pour gagner 20 points en partageant un lien de
                            cooptation. Pour chaque invité actif, gagnez 80 points
                            supplémentaires! L{"'"}équivalent donc d{"'"}un achat de 100€ en boutique,
                            cela vaut donc le coup de partager!
                        </li>
                        <li className="mt-2">
                            • Suivez votre boutique préférée en cliquant sur l{"'"}icone du panier
                            et gagnez 2 points de fidélité. Cela vous permettra d{"'"}être notifié
                            de toutes les publications de cette dernière. Vous pouvez aussi
                            cliquez sur le pouce si vous aimez la boutique pour gagner un point
                            de plus.
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="mt-5 flex sm:justify-center lg:justify-start  mb-4 gap-2 font-bold tracking-tight text-2xl">
                        2. Comment devenir
                        <span className="block text-vol">actif</span>?
                    </h3>
                </div>
                <div>
                    <p className="mt-2">
                        Pour devenir actif, il faut avoir dépensé au moins 1 euro en boutique.
                        N{"'"}oubliez pas de scanner le code QR correspondant à votre achat en
                        caisse.
                    </p>
                </div>
                <div className="flex sm:justify-center lg:justify-start ">
                    <h3>
                        <p className="mt-5 mb-4 gap-2 lg:justify-start font-bold tracking-tight text-2xl">
                            3. Que faire de mes{" "}
                            <span className="text-vol">points accumulés</span> ?
                        </p>
                    </h3>
                </div>
                <div>
                    <p className="">
                        Il existe <strong>plusieurs campagnes de marketing</strong> à
                        Montauban (82) jusqu{"'"}au 31 Janvier 2023 :
                    </p>
                    <ul role="list" className="list-disc">
                        <li className="mt-2">
                            • Inscrivez-vous GRATUITEMENT sur Virtualia Shop pour participer à notre loterie inter-boutique!
                            Scannez le code QR de la boutique pour valider votre ticket.
                            Gagnez <span className="text-vol"><strong>90€</strong></span> à dépenser dans une de nos boutiques partenaires.
                            Le tirage au sort aura lieu le 31 décembre 2022 parmi tous les codes QR de boutique (20 pts) qui auront été scannés.
                            Le gagnant recevra un email de notre part entre le 1 et 4 Janvier 2023.
                        </li>
                        <li className="mt-2">
                            • Gagnez un week-end bien-être et gastronomie (une WonderBox d’une
                            valeur maximale de 280€) pour le membre qui aura accumulé le plus de
                            points (et un minimum de 200 points pour se qualifier).
                        </li>
                        <li className="mt-2">
                            • Celui qui aura scanné le plus de codes QR de magasins partenaires
                            gagnera une table prestige pour deux personnes parmi 700 restaurants
                            (d{"'"}une valeur de 119.90€ pour 2 personnes). Nous avons 20 boutiques
                            partenaires à scanner pour la période. Astuce: Les codes QR se trouvent dans la boutique
                            et non sur la vitrine. Règle: il faut un minimum de 10 candidats potentiels ayant scanné au moins 18 codes QR de boutique pour valider ce lot.
                        </li>
                        <li className="mt-2">
                            • Gagnez un coffret cadeau beauté de 100€ pour avoir
                            invité le plus d’amis actifs (par actif, vos amis devront dépenser
                            une fois dans une boutique partenaire, scanner le code QR
                            correspondant à leur achat et scanner deux QR codes de boutique).
                        </li>
                        {/*
          <li className="mt-2">
            • Gagnez 300€ pour celui qui aura dépensé le plus dans des
            différents magasins partenaires de Montauban (n’oubliez pas de
            scanner les points correspondants à vos achats en boutique).
          </li>
            */}
                        <li className="mt-2">
                            • Inscrivez-vous sur Virtualia Shop et gagnez des tickets dans
                            différents musées de Montauban pour les 4 autres membres ayant
                            collecté le plus de points (hormis les gagnants précédents).
                        </li>
                    </ul>
                    <p className="mt-5">
                        Enfin <strong>tout au long de l{"'"}année 2023</strong> :
                    </p>
                    <p className="mt-2">
                        • Partagez une cagnotte jusqu{"'"}à 5000€* en cash-back pour ceux qui
                        auront le plus accumulés de points (n{"'"}oubliez pas de scanner les
                        points correspondant à vos achats dans le magasin, de scanner les
                        codes QR de nos boutiques partenaires, un des nos flyers et tout code
                        QR placé dans différents lieux de Montauban, d{"'"}aimer et de suivre les
                        boutiques sur virtualia.shop). Un classement général sera publié à
                        partir de Février 2023 et mis à jour régulièrement.
                    </p>
                </div>
                <h3 className="mt-5 sm:text-center lg:text-left mb-4 font-bold tracking-tight text-2xl">
                    4. À propos des <span className="text-vol">likes</span> et du bouton <span className="text-vol">suivi</span>
                </h3>
                <p>
                    Le bouton {`"`}liker{`"`} (le pouce) vous permet de montrer que vous appréciez un magasin sans toutefois souhaité être notifié de ces arrivages et annonces.
                </p>
                <p>
                    Le bouton sous forme de panier orange vous permet de devenir un {`"`}follower{`"`} et donc de suivre toutes les notications des arrivages et annonces de ce magasin. Si toutefois vous souhaitez plus recevoir aucun message de la part des magasins que vous suivez, il suffit d{`'`}aller sur votre profile et d{`'`}indiquer que vous ne souhaitez pas recevoir de mail ou de push notification à ce sujet (cela vous évite de décocher tous les magasins que vous suivez).
                </p>
                <h3 className="mt-5 sm:text-center lg:text-left mb-4 font-bold tracking-tight text-2xl">
                    5. D{"'"}autres <span className="text-vol">questions</span> ?
                </h3>
                <p className="mb-20">
                    Consultez notre{" "}
                    <strong>
                        <Link href="/a-propos" className="text-vol">
                            FAQ
                        </Link>
                    </strong>
                    .
                </p>
                <div className="text-center">
                    <h2 className="font-bold tracking-tight sm:text-2xl mb-4">
                        N{"'"}oubliez pas!
                    </h2>
                    <i className="block">On ne devrait jamais quitter Montauban.</i>
                    <p className="mb-10">Les Tontons Flingueurs</p>
                </div>
            </div>
        </main>
    )
}
Home.layout = "L1"
