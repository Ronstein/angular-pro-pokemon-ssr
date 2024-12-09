import { ApplicationRef, ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnDestroy {

  // public currentName = signal('Rodrigo');

  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private title = inject(Title);

  public currentPage = toSignal<number>(
    // this.route.queryParamMap.pipe(
    //   map(params => params.get('page') ?? '1'),
    //   map(page => (isNaN(+page) ? 1 : +page)),
    //   map(page => Math.max(1, page))
    // )
    this.route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  );

  public loadOnPageChanged = effect(() => {
    //console.log('Pagina cambio', this.currentPage());
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true,
  })

  // public isLoading = signal(true);
  // private appRef = inject(ApplicationRef);

  // private $appState = this.appRef.isStable.subscribe(isStable => console.log({ isStable }))

  // ngOnInit(): void {
  //   //this.route.queryParamMap.subscribe(console.log);
  //   //console.log(this.currentPage());

  //   this.loadPokemons();
  //   // setTimeout(() => {
  //   //   this.isLoading.set(false);
  //   // }, 1500);

  // }

  ngOnDestroy(): void {
    //  this.$appState.unsubscribe();
  }

  public loadPokemons(page: number = 0) {



    this.pokemonsService.loadPage(page)
      .pipe(
        // tap(() => this.router.navigate([], { queryParams: { page: pageToLoad } })
        // ),
        tap(() => this.title.setTitle(`Pokémons SSR - Page ${page}`))
      )
      .subscribe(pokemons => {
        // console.log('Oninit');
        this.pokemons.set(pokemons);
      })
  }

}
