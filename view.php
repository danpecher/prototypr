<?php

class View {

	private $engine;

	public function __construct()
	{
		$this->setup();
	}

	public function render($view, $data = [])
	{
		return $this->engine->make($view, $data)->render();
	}

	private function setup()
	{
		$filesystem = new Illuminate\Filesystem\Filesystem;
		$compiler = new Illuminate\View\Compilers\BladeCompiler($filesystem, __DIR__.'/cache/views/');
		$er = new Illuminate\View\Engines\EngineResolver;
		$er->register('blade', function() use ($filesystem, $compiler)
		{
			return new Illuminate\View\Engines\CompilerEngine($compiler, $filesystem);
		});
		$finder = new Illuminate\View\FileViewFinder($filesystem, [__DIR__.'/views/']);
		$this->engine = new Illuminate\View\Factory($er, $finder, new Illuminate\Events\Dispatcher);
	}

}