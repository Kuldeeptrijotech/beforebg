import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { products } from "@/lib/site-data";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPreview() {
    const visibleProducts = products.filter((product) => product.showOnHome);

    return (
        <section className="bg-white py-20 text-slate-950">
            <Container>
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">
                            Our Solutions
                        </p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
                            Practical SAP products built for Enterprise teams.
                        </h2>

                        <p className="mt-4 text-base leading-7 text-slate-600">
                            Explore Trijotech solutions designed to simplify operations,
                            improve reporting, and support business-critical SAP workflows.
                        </p>
                    </div>

                    <Button href="/solutions" tone="dark">
                        View all Solutions
                    </Button>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {visibleProducts.map((product) => (
                        <article
                            key={product.title}
                            className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl"
                        >
                            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                                <Image
                                    src={product.image}
                                    alt={product.imageAlt}
                                    fill
                                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                                    className="object-cover transition duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="text-xl font-semibold leading-7">
                                    {product.title}
                                </h3>

                                <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                                    {product.description}
                                </p>

                                <Link
                                    href={product.href}
                                    className="mt-6 inline-flex w-fit items-center text-sm font-semibold text-cyan-700 transition hover:text-slate-950"
                                >
                                    Explore product
                                    <span className="ml-2 transition group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    )
}
